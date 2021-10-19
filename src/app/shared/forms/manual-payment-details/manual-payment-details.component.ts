import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-manual-payment-details',
  templateUrl: './manual-payment-details.component.html',
  styleUrls: ['./manual-payment-details.component.scss'],
})
export class ManualPaymentDetailsComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

  dropdownOptions: any[] = ['Mağusa', 'Girne'];

  banks: any[];

  agencies: any[] = [];
  filteredAgencies: any;

  @Input() formName: any;
  payment: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog,
    public translate: TranslateService
  ) {
    this.dialogRef.onShow.subscribe(() => {
      this.loadSubscriptions();
    });
    this.dialogRef.onHide.subscribe(() => {
      this.destroySubscription();
    });
  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        console.log(value);
        this.payment = value;
        this.initializeForm();
      });

    this.banks = this.dataService.banksList;
    this.loadAgencies();
    if (this.formName === 'manualPaymentDetailsForm') {
      this.submitSubscriber$ = this.formService
        .getSubmitSubject()
        .subscribe((value) => {
          if (value === 'submit') {
            this.submitForm();
          }
        });
    }
    this.formValidationSubscriber$ = this.formService.listenToValueChanges(
      this.form
    );

    this.dirtyFormSubscriber$ = this.formService
      .getDirtyFormSubject()
      .subscribe((value) => {
        if (value) {
          Object.keys(this.form.controls).forEach((x) => {
            this.form.get(x)?.markAsTouched();
          });
        }
      });
  }

  destroySubscription() {
    this.objectSubscriber$.unsubscribe();
    this.submitSubscriber$.unsubscribe();
    this.formValidationSubscriber$.unsubscribe();
    this.dirtyFormSubscriber$.unsubscribe();
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    if (obj.agency?.name) obj.agency = obj.agency.name;

    this.dataService.addNewManualPayment(obj).subscribe(
      (response) => {
        this.formService.triggerRefresh();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Yeni ödeme başarıyla eklendi',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
  }

  initializeForm() {
    this.form = this.fb.group({
      amount: new FormControl(this.payment.amount, [Validators.required]),
      agency: new FormControl(this.payment.agency, [Validators.required]),
      date: new FormControl(new Date(this.payment.date), []),
      chequeNo: new FormControl(this.payment.chequeNo, []),
      description: new FormControl(this.payment.description, []),
      port: new FormControl(this.payment.port, []),
      bank: new FormControl(this.payment.bank, []),
      code9072: new FormControl(this.payment.code9072, []),
      code9049: new FormControl(this.payment.code9049, []),
      code9050: new FormControl(this.payment.code9050, []),
      code9051: new FormControl(this.payment.code9051, []),
      code9083: new FormControl(this.payment.code9083, []),
      code9084: new FormControl(this.payment.code9084, []),
      code9195: new FormControl(this.payment.code9195, []),
      code9138: new FormControl(this.payment.code9138, []),
      code9148: new FormControl(this.payment.code9148, []),
    });
    this.form.disable();
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  // Autocomplete

  filterAgencies(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.agencies.length; i++) {
      let item = this.agencies[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filteredAgencies = filtered;
  }

  loadAgencies() {
    this.dataService.getAllAgencies('', 10000, 1, false).subscribe(
      (response) => {
        this.agencies = response.agencyList;
        // console.log(this.agencies);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
  }
}
