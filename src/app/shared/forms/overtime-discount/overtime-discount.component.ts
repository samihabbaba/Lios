import { Component, OnInit } from '@angular/core';
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
  selector: 'app-overtime-discount',
  templateUrl: './overtime-discount.component.html',
  styleUrls: ['./overtime-discount.component.scss'],
})
export class OvertimeDiscountComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  tabViewSubscriber$: Subscription;
  form: FormGroup;

  tabView: string;
  objReceived: any;

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
    this.tabViewSubscriber$ = this.formService.tabPage.subscribe((value) => {
      this.tabView = value;
    })

    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        // console.log(value);
        this.objReceived = value;
      });

    this.initializeForm();

    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((x) => {
        if (x === 'submit' && this.tabView === 'overtime') {
          this.submitForm();
        }
      });

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
    this.tabViewSubscriber$.unsubscribe();
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    obj.id = this.objReceived.id;
    this.dataService.updateOvertimeDiscount(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Yüzdelik başarıyla güncellendi',
      });
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      percent: new FormControl(this.objReceived.percent, [Validators.required]),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}