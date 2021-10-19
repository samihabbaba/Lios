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
  selector: 'app-add-local',
  templateUrl: './add-local.component.html',
  styleUrls: ['./add-local.component.scss'],
})
export class AddLocalComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

  countryDropdown: any[];
  martialStatus: any[];
  gender: any[];
  bloodTypes: any[];
  staffTypes: any[];
  roles: any[];
  @Input() formName: any;

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog
  ) {
    this.dialogRef.onShow.subscribe(() => {
      this.countryDropdown = this.dataService.countries;
      this.martialStatus = this.dataService.martialStatus;
      this.gender = this.dataService.gender;
      this.bloodTypes = this.dataService.bloodTypes;
      this.staffTypes = this.dataService.staffTypes;
      this.roles = this.dataService.roles;

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
      });

    this.initializeForm();

    if (this.formName === 'addLocalForm') {
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
    this.dataService
      .staffUsernameAvailable(this.form.get('userName')?.value)
      .subscribe(
        (response) => {
          if (response.body) {
            let obj = this.form.getRawValue();
            this.dataService.addNewStaff(obj).subscribe((response) => {
              this.formService.triggerRefresh();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Yeni kullanıcı başarıyla eklendi',
              });
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Kullanıcı adı başka bir kullanıcıya ait',
            });
          }
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
      name: new FormControl(null, [Validators.required]),
      userName: new FormControl(null, [Validators.required]),
      country: new FormControl(null, []),
      department: new FormControl(null, []),
      cardNumber: new FormControl(null, []),
      systemId: new FormControl(null, []),
      martialStatus: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      bloodType: new FormControl(null, [Validators.required]),
      placeOfBirth: new FormControl(null, []),
      dob: new FormControl(new Date(), []),
      staffType: new FormControl(null, [Validators.required]),
      transferTime: new FormControl(new Date(), []),
      email: new FormControl(null, []),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, []),
      isLogin: new FormControl(true, []),
      isTransfer: new FormControl(false, []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }
}
