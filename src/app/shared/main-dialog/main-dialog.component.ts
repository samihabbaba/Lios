import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.scss'],
})
export class MainDialogComponent implements OnInit {
  @Input() displayDialog: boolean = true;
  @Input() dialogHeader: string = 'Default Header';
  @Input() formName: string;
  @Output() closeDialog = new EventEmitter<any>();

  formIsValid: boolean = false;
  formValidationSubscription$: Subscription;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  submitForm(button: any) {
    if (button.disabled) {
      this.formService.setFormAsDirty();
    } else {

        this.formService.triggerSubmit();

      this.closeDialog.emit();
    }
  }

  onDialogShow() {
    this.formValidationSubscription$ = this.formService
      .getFormValidationSubject()
      .subscribe((x) => {
        this.formIsValid = x;
      });

  }

  onDialogHide() {
    this.formValidationSubscription$.unsubscribe();
    this.closeDialog.emit();
    this.formService.setFormToInvalid();
  }
}
