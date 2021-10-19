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
  selector: 'app-captain-details',
  templateUrl: './captain-details.component.html',
  styleUrls: ['./captain-details.component.scss'],
})
export class CaptainDetailsComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  form: FormGroup;
  dirtyFormSubscriber$: Subscription;
  objReceived: any;

  @Input() formName: any;
  dropdownOptions: any[];

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
  ) {
    if(this.formName === 'captainDetailsForm') {

      this.dialogRef.onShow.subscribe(() => {
        this.dropdownOptions = this.dataService.countries;
        this.loadSubscriptions();
      });
      this.dialogRef.onHide.subscribe(() => {
        this.destroySubscription();
      });
    }
  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.objReceived = value;
      });

    this.initializeForm();
    if (this.formName === 'addCaptainForm') {
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
    obj.id = this.objReceived.id;
    this.dataService.updateCaptain(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Kaptan başarıyla güncellendi',
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
      firstName: new FormControl(this.objReceived.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.objReceived.lastName, [
        Validators.required,
      ]),
      title: new FormControl(this.objReceived.title, []),
      telephone: new FormControl(this.objReceived.telephone, []),
      country: new FormControl(this.objReceived.country, []),
      district: new FormControl(this.objReceived.district, []),
      address: new FormControl(this.objReceived.address, []),
      webLink: new FormControl(this.objReceived.webLink, []),
      email: new FormControl(this.objReceived.email, []),
      isLocal: new FormControl(this.objReceived.isLocal, []),
      isGuidline: new FormControl(this.objReceived.isGuidline, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
