import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-pay-trip-form',
  templateUrl: './pay-trip-form.component.html',
  styleUrls: ['./pay-trip-form.component.scss'],
})
export class PayTripFormComponent implements OnInit {
  displayTelerikDialog: boolean = false;
  telerik: boolean = false;

  @Input() displayPayTripDialog: boolean;
  @Output() closePayTripDialog = new EventEmitter<any>();
  objectSubscriber$: Subscription;

  tripId: string;
  invoiceId: string;
  agencyOptions: any[];
  form: FormGroup;

  paymentTypes;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.paymentTypes = this.dataService.paymentTypes;
  }

  submit(button: any) {
    let obj = this.form.getRawValue();
    this.dataService.addNewPayment(obj).subscribe((resp) => {
      this.formService.triggerRefresh();
      this.closePayTripDialog.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Ödeme başarı ile yapıldı',
      });
    });
  }

  onDialogShow() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.tripId = value.id;
        // console.log(value);
        this.dataService.getTripInvoiceById(this.tripId).subscribe((resp) => {
          this.agencyOptions = resp.filter((x) => !x.isPaid);
          this.initializeForm();
        });
      });
  }

  onDialogHide() {
    this.objectSubscriber$.unsubscribe();
    this.closePayTripDialog.emit();
  }

  initializeForm() {
    this.form = this.fb.group({
      invoiceId: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      refrence: new FormControl(null, [Validators.required]),
      rate: new FormControl(0, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
    });
  }

  onAgencyChange(event) {
    this.form.patchValue({
      invoiceId: event.value.invoiceId,
      amount: event.value.totalAmount,
    });
  }

  checkValidity(formControl: string, boat = false) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  reportVar1 = '';
  reportVar2 = '';
  reportIsAlternative = '';

  showTelerikReport(var1 = '', var2 = '', isAlternative = false) {
    // Check this part of the code again pls

    this.reportVar2 = var2;
    if (isAlternative) {
      this.reportIsAlternative = 'true';
    } else {
      this.reportIsAlternative = 'false';
    }

    this.displayTelerikDialog = true;
    this.telerik = true;
  }
}
