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
  selector: 'app-local-password',
  templateUrl: './local-password.component.html',
  styleUrls: ['./local-password.component.scss'],
})
export class LocalPasswordComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

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
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.objReceived = value;
      });

    this.initializeForm();

    this.submitSubscriber$ = this.formService
      .getSubmitSubject()
      .subscribe((value) => {
        if (value === 'submit') {
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
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    if (obj.newPassword !== obj.newPasswordConfirm) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Hata',
        detail: 'Şifreler birbiriyle uyuşmalı',
      });
      return;
    } else {
      delete obj.newPasswordConfirm;
      this.dataService
        .updateStaffPassword(obj, this.objReceived.id)
        .subscribe((response) => {
          this.formService.triggerRefresh();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Kullanıcı başarıyla güncellendi',
          });
        });
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      newPassword: new FormControl(null, [Validators.required]),
      newPasswordConfirm: new FormControl(null, [Validators.required]),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
