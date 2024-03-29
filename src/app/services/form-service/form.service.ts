import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private submitSubject = new BehaviorSubject<any>(null);
  private refreshSubject = new BehaviorSubject<any>(null);
  private formValidationSubject = new BehaviorSubject<boolean>(false);
  private formObject = new BehaviorSubject<any>(null);
  private dirtyFormSubject = new BehaviorSubject<any>(false);
  public loadingSubject = new BehaviorSubject<any>(false);
  public ngSwitchSubject = new BehaviorSubject<any>(null);

  tabPage = new BehaviorSubject<string>('');
  currentlyOpenForm: string;

  constructor() {}

  checkForm(formName: string) {
    return this.currentlyOpenForm === formName;
  }

  sendObjectToForm(object: any) {
    this.formObject.next(object);
  }

  triggerSubmit(value = 'submit') {
    this.submitSubject.next(value);
    this.submitSubject = new BehaviorSubject<any>(null);
  }

  triggerRefresh() {
    this.refreshSubject.next('refresh');
  }

  setFormToValid() {
    this.formValidationSubject.next(true);
  }

  setFormToInvalid() {
    this.formValidationSubject.next(false);
  }

  setFormAsDirty() {
    this.dirtyFormSubject.next(true);
  }

  listenToValueChanges(form: any) {
    return form.valueChanges.pipe().subscribe(() => {
      if (form.valid) {
        this.setFormToValid();
      }
      if (!form.valid) {
        this.setFormToInvalid();
      }
    });
  }

  getFormObject() {
    return this.formObject;
  }

  getRefreshSubject() {
    return this.refreshSubject;
  }

  getSubmitSubject() {
    return this.submitSubject;
  }

  getFormValidationSubject() {
    return this.formValidationSubject;
  }

  getDirtyFormSubject() {
    return this.dirtyFormSubject;
  }

  resetForm() {
    this.dirtyFormSubject = new BehaviorSubject<any>(false);
  }
}
