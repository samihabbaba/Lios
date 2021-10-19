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
  selector: 'app-add-manual-payment',
  templateUrl: './add-manual-payment.component.html',
  styleUrls: ['./add-manual-payment.component.scss'],
})
export class AddManualPaymentComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

  dropdownOptions: any[] =['Mağusa', 'Girne'];

  banks: any[];

  agencies: any[] = [];
  filteredAgencies: any;

  @Input() formName: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog,
    public translate: TranslateService
  ) {


      this.dialogRef.onShow.subscribe(() => {
        this.initializeForm();
        this.loadSubscriptions();
      });
      this.dialogRef.onHide.subscribe(() => {
        this.destroySubscription();
this.formName = null;
      });

  }

  ngOnInit() {}

  loadSubscriptions() {
    this.banks = this.dataService.banksList;
    this.loadAgencies();
    if(this.formName === 'addManualPaymentForm') {
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
    // this.objectSubscriber$.unsubscribe();
    this.submitSubscriber$.unsubscribe();
    this.formValidationSubscriber$.unsubscribe();
    this.dirtyFormSubscriber$.unsubscribe();
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    if (obj.agency?.name) obj.agency = obj.agency.name;

    this.dataService.addNewManualPayment(obj).subscribe((response) => {
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
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      amount: new FormControl(null, [Validators.required]),
      agency: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), []),
      chequeNo: new FormControl(null, []),
      description: new FormControl(null, []),
      port: new FormControl(null, []),
      bank: new FormControl(null, []),
      code9072: new FormControl(0, [],),
      code9049: new FormControl(0, []),
      code9050: new FormControl(0, []),
      code9051: new FormControl(0, []),
      code9083: new FormControl(0, []),
      code9084: new FormControl(0, []),
      code9195: new FormControl(0, []),
      code9138: new FormControl(0, []),
      code9148: new FormControl(0, []),
    });

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
    this.dataService
      .getAllAgencies('', 10000, 1, false)
      .subscribe((response) => {
        this.agencies = response.agencyList;
        // console.log(this.agencies);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
  }
}
