import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-pay-crane',
  templateUrl: './pay-crane.component.html',
  styleUrls: ['./pay-crane.component.scss'],
})
export class PayCraneComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  form: FormGroup;

  crane: any;

  invoices: any[];
  selectedInvoices: any[];
  @Input() formName: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
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
        // console.log(value);
        this.crane = value;
        this.invoices = [...this.crane.inquiry];
        this.selectedInvoices = [...this.invoices];
      });
      if (this.formName === 'payCraneForm') {
    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((value) => {
        if (value === 'submit') {
          this.submitForm();
        }
      });
    }
    if (this.selectedInvoices.length < 1) {
      this.formService.setFormToInvalid();
    } else {
      this.formService.setFormToValid();
    }
  }

  returnTotalAmount() {
    const total = Object.values(this.selectedInvoices).reduce(
      (t, { amount }) => t + amount,
      0
    );
    return total;
  }

  getInvoice() {
    this.dataService.getCraneByInvoiceId(this.crane.id).subscribe(
      (resp) => {
        this.crane = resp;
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

  destroySubscription() {
    this.objectSubscriber$.unsubscribe();
    this.submitSubscriber$.unsubscribe();
    this.formService.resetForm();
    this.formService.setFormToInvalid();
  }

  submitForm() {
    let arr: any = [];
    this.selectedInvoices.forEach((x: any) => {
      arr.push(x.id);
    });

    if (this.crane) {
      this.dataService.payCraneInvoice(this.crane.id, arr).subscribe(
        (resp) => {
          this.formService.triggerRefresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ödeme başarıyla gerçekleşti',
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
  }
}
