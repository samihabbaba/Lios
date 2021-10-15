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
    this.dataService.addNewPayment(obj).subscribe(
      (resp) => {
        this.formService.triggerRefresh();
        // this.closePayTripDialog.emit();
        let i = this.agencyOptions.findIndex(
          (x) => x.invoiceId == obj.invoiceId
        );
        this.agencyOptions[i].isPaid = true;

        this.form.patchValue({
          isPaid: true,
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ödeme başarı ile yapıldı',
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

  modalToPrint = {
    isAlternative: false,
    invoiceId: -1,
  };
  agencyChanged;
  onDialogShow() {
    this.modalToPrint = {
      isAlternative: false,
      invoiceId: -1,
    };
    this.agencyOptions = [];

    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.tripId = value.id;
        // console.log(value);
        this.dataService.getTripInvoiceById(this.tripId).subscribe((resp) => {
          this.agencyOptions = resp;
          this.agencyChanged = resp.length > 1;
          this.initializeForm();
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        });
      });
  }

  onDialogHide() {
    this.objectSubscriber$.unsubscribe();
    this.form.reset();
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
      isPaid: new FormControl(false, [Validators.required]),
    });
  }

  onAgencyChange(event) {
    this.form.patchValue({
      invoiceId: event.value.invoiceId,
      amount: event.value.totalAmount,
      isPaid: event.value.isPaid,
    });

    this.modalToPrint.invoiceId = event.value.invoiceId;
    let index = this.agencyOptions.findIndex(
      (x) => x.invoiceId == event.value.invoiceId
    );
    // this.modalPrintDetails = this.modalToPrint[ index ];

    if (index == 0) {
      this.modalToPrint.isAlternative = false;
    } else if (index == 1) {
      this.modalToPrint.isAlternative = true;
    }
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

    if (!this.form.controls.isPaid.value || this.modalToPrint.invoiceId == -1) {
      return;
    }
    this.reportVar1 = var1;
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
