import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Observable } from 'rxjs';
import { FormService } from '../form-service/form.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formService: FormService,
    public translate: TranslateService
  ) {}

  openDeleteConfirmation(recordName: any, deleteRequest: Observable<any>) {
    return this.confirmationService.confirm({
      message:
        this.translate.instant('Do you want to delete') +
        ' ' +
        recordName +
        ' ?',
      header: this.translate.instant('Delete Confirmation'),
      icon: 'pi pi-info-circle',
      accept: () => {
        deleteRequest.subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: this.translate.instant('Record deleted'),
          });
          this.formService.triggerRefresh();
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      },
    });
  }
}
