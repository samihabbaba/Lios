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
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.scss'],
})
export class LocalDetailsComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

  objReceived: any;
  @Input() formName: any;

  countryDropdown: any[];
  martialStatus: any[];
  gender: any[];
  bloodTypes: any[];
  staffTypes: any[];
  roles: any[];

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
  ) {
    this.dialogRef.onShow.subscribe(() => {
      if (this.formService.checkForm('localDetailsForm')) {
        this.countryDropdown = this.dataService.countries;
        this.martialStatus = this.dataService.martialStatus;
        this.gender = this.dataService.gender;
        this.bloodTypes = this.dataService.bloodTypes;
        this.staffTypes = this.dataService.staffTypes;
        this.roles = this.dataService.roles;

        this.loadSubscriptions();
      }
    });
    this.dialogRef.onHide.subscribe(() => {
      if (this.formService.checkForm('localDetailsForm')) {
        this.destroySubscription();
      }
    });
  }

  ngOnInit() {}

  loadSubscriptions() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.objReceived = value;
        // console.log(value);
      });

    this.initializeForm();

    if (this.formName === 'localDetailsForm') {
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
    // this.dataService
    //   .staffUsernameAvailable(this.form.get('userName')?.value)
    //   .subscribe((response) => {
    //     if (response.body) {
    let obj = this.form.getRawValue();
    obj.id = this.objReceived.id;
    this.dataService.updateStaff(obj).subscribe(
      (response) => {
        this.formService.triggerRefresh();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'kullanıcı başarıyla güncellendi',
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
    //   } else {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Kullanıcı adı başka bir kullanıcıya ait',
    //     });
    //   }
    // });
  }

  initializeForm() {
    this.form = this.fb.group({
      name: new FormControl(this.objReceived.name, [Validators.required]),
      // userName: new FormControl(this.objReceived.userName, [
      //   Validators.required,
      // ]),
      country: new FormControl(this.objReceived.country, []),
      department: new FormControl(this.objReceived.department, []),
      cardNumber: new FormControl(this.objReceived.cardNumber, []),
      systemId: new FormControl(this.objReceived.systemId, []),
      martialStatus: new FormControl(this.objReceived.martialStatus, [
        Validators.required,
      ]),
      gender: new FormControl(this.objReceived.gender, [Validators.required]),
      bloodType: new FormControl(this.objReceived.bloodType, [
        Validators.required,
      ]),
      placeOfBirth: new FormControl(this.objReceived.placeOfBirth, []),
      dob: new FormControl(new Date(this.objReceived.dob), []),
      staffType: new FormControl(this.objReceived.staffType, [
        Validators.required,
      ]),
      transferTime: new FormControl(
        new Date(this.objReceived.transferTime),
        []
      ),
      email: new FormControl(this.objReceived.email, []),
      role: new FormControl(this.objReceived.role, [Validators.required]),
      // password: new FormControl(this.objReceived.password, []),
      isLogin: new FormControl(this.objReceived.isLogin, []),
      isTransfer: new FormControl(this.objReceived.isTransfer, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
