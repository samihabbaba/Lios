import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TabPanel } from 'primeng/tabview';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
@Component({
  selector: 'app-ship-inquery-form',
  templateUrl: './ship-inquery-form.component.html',
  styleUrls: ['./ship-inquery-form.component.scss'],
})
export class ShipInqueryFormComponent implements OnInit {
  displayTelerikDialog: boolean = false;
  telerik: boolean = false;

  @Input() displayInqueryDialog: boolean;
  @Output() closeInqueryDialog = new EventEmitter<any>();
  objectSubscriber$: Subscription;

  tripId: string;
  overtimeForm: FormGroup;
  boatForm: FormGroup;

  boatInqueries: any;
  overtimeInqueries: any;

  overtimeServices: any;
  boatServices: any;

  boatInqueryTypes: any[];

  selectedRow: any;

  overtimeEditMode: boolean = false;
  boatEditMode: boolean = false;

  @ViewChild('overtimeTab') overtimeTab: TabPanel;
  @ViewChild('boatTab') boatTab: TabPanel;

  overtimeMenuItems = [
    {
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-refresh',
          command: () => {
            this.overtimeEditMode = true;
            this.overtimeForm.patchValue({
              serviceId: this.overtimeServices.find(
                (x) => x.id === this.selectedRow.serviceId
              ),
              start: new Date(this.selectedRow.start),
              end: new Date(this.selectedRow.end),
              operator: this.selectedRow.charge,
              type: this.selectedRow.type,
            });
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            let obj = this.selectedRow;
            obj.isDeleted = true;
            this.dataService.updateOvertimeInquery(obj).subscribe((resp) => {
              this.overtimeInqueries.splice(
                this.overtimeInqueries.findIndex((x) => x == this.selectedRow),
                1
              );
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Bir hata oluştu.',
              });
            });
          },
        },
      ],
    },
  ];

  boatMenuItems = [
    {
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-refresh',
          command: () => {
            this.boatEditMode = true;
            this.boatForm.patchValue({
              serviceId: this.boatServices.find(
                (x) => x.id === this.selectedRow.serviceId
              ),
              start: new Date(this.selectedRow.start),
              end: new Date(this.selectedRow.end),
              charge: this.selectedRow.charge,
              type: this.selectedRow.type,
            });
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            let obj = this.selectedRow;
            obj.isDeleted = true;
            this.dataService.updateBoatInquery(obj).subscribe((resp) => {
              this.boatInqueries.splice(
                this.boatInqueries.findIndex((x) => x == this.selectedRow),
                1
              );
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Bir hata oluştu.',
              });
            });
          },
        },
      ],
    },
  ];

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.boatInqueryTypes = this.dataService.boatInqueryType;
  }

  submitOvertime(button: any) {
    let obj = this.overtimeForm.getRawValue();
    if (obj.serviceId.id) obj.serviceId = obj.serviceId.id;
    if (this.overtimeEditMode) {
      obj.id = this.selectedRow.id;
      this.dataService.updateOvertimeInquery(obj).subscribe((resp) => {
        this.onDialogShow();
        this.getOvertimeInquery();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
    } else {
      this.dataService.addOvertimeInquery(obj).subscribe((resp) => {
        this.onDialogShow();
        this.getOvertimeInquery();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
    }
  }

  submitBoat(button: any) {
    let obj = this.boatForm.getRawValue();
    if (obj.serviceId.id) obj.serviceId = obj.serviceId.id;
    if (this.boatEditMode) {
      obj.id = this.selectedRow.id;
      this.dataService.updateBoatInquery(obj).subscribe((resp) => {
        this.onDialogShow();
        this.getBoatInquery();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
    } else {
      this.dataService.addBoatInquery(obj).subscribe((resp) => {
        this.onDialogShow();
        this.getBoatInquery();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
    }
  }

  getBoatInquery() {
    this.dataService.getAllBoatInqueryForTrip(this.tripId).subscribe((resp) => {
      this.boatInqueries = resp;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  getOvertimeInquery() {
    this.dataService
      .getAllOvertimeInqueryForTrip(this.tripId)
      .subscribe((resp) => {
        this.overtimeInqueries = resp;
      });
  }

  onDialogShow() {
    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.tripId = value.tripId;
        if(!this.tripId) this.tripId = value.id
        this.getOvertimeServices();
        this.getOBoatServices();

        if (this.tripId) {
          this.getBoatInquery();
          this.getOvertimeInquery();
        }
      });
  }

  onDialogHide() {
    this.closeInqueryDialog.emit();
  }

  getOvertimeServices() {
    this.dataService.getAllOvertimeServices().subscribe((resp) => {
      this.initializeOvertimeForm();
      this.overtimeServices = resp;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  getOBoatServices() {
    this.dataService.getAllBoatServices().subscribe((resp) => {
      this.initializeBoatForm();
      this.boatServices = resp;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  initializeOvertimeForm() {
    this.overtimeForm = this.fb.group({
      serviceId: new FormControl(null, [Validators.required]),
      tripId: new FormControl(this.tripId, []),
      operator: new FormControl(0, []),
      start: new FormControl(new Date(), [Validators.required]),
      end: new FormControl(new Date(), [Validators.required]),
    });
  }

  initializeBoatForm() {
    this.boatForm = this.fb.group({
      serviceId: new FormControl(null, [Validators.required]),
      tripId: new FormControl(this.tripId, []),
      charge: new FormControl(null, []),
      type: new FormControl(null, []),
      start: new FormControl(new Date(), [Validators.required]),
      end: new FormControl(new Date(), [Validators.required]),
    });
  }

  checkValidity(formControl: string, boat = false) {
    if (boat) {
      return (
        this.boatForm.get(formControl)?.touched &&
        this.boatForm.get(formControl)?.invalid
      );
    } else {
      return (
        this.overtimeForm.get(formControl)?.touched &&
        this.overtimeForm.get(formControl)?.invalid
      );
    }
  }

  clearSelectionOvertime() {
    this.selectedRow = '';
    this.overtimeEditMode = false;
    this.overtimeForm.reset();
  }

  clearSelectionBoat() {
    this.selectedRow = '';
    this.boatEditMode = false;
    this.boatForm.reset();
  }

  reportVar1 = '';
  reportVar2 = '';
  reportIsAlternative = '';

  showTelerikReport(var1 = '', var2 = '', isAlternative = false) {

    if (var1 === 'inq') {
      if (this.overtimeTab._selected) {
        this.reportVar1 = 'overtime';
      }
      if (this.boatTab._selected) {
        this.reportVar1 = 'boat';
      }
    } else {
      this.reportVar1 = var1;
    }
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
