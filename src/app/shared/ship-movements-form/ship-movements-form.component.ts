import { ThrowStmt } from '@angular/compiler';
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
  selector: 'app-ship-movements-form',
  templateUrl: './ship-movements-form.component.html',
  styleUrls: ['./ship-movements-form.component.scss'],
})
export class ShipMovementsFormComponent implements OnInit {
  displayTelerikDialog: boolean = false;

  @Input() displayMovementsDialog: boolean;
  @Output() closeMovementsDialog = new EventEmitter<any>();
  objectSubscriber$: Subscription;

  tripId: string;
  form: FormGroup;

  movements: any;

  selectedRow: any;

  editMode: boolean = false;

  accomodations: any;
  movementsTypeDropdown: any;

  captains: any[];
  filteredCaptains: any[] = [];

  selectOptions = [
    { label: 'Free', value: true },
    { label: 'Conventional', value: false },
  ];

  overtimeMenuItems = [
    {
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-refresh',
          command: () => {
            this.editMode = true;
            this.form.patchValue({
              date: new Date(this.selectedRow.date),
              accommodationId: this.accomodations.find(
                (x) => x.id === this.selectedRow.accommodationId
              ),
              isFree: this.selectedRow.isFree,
              isPilotage: this.selectedRow.isPilotage,
              pilotageId: this.captains.find(
                (x) =>
                  x.firstName + ' ' + x.lastName ==
                  this.selectedRow.pilotageName
              ),
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
            this.dataService.updateMovement(obj).subscribe((resp) => {
              this.getMovements();
              this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Hareket başarıyla silindi',
              });
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
    this.movementsTypeDropdown = this.dataService.movementType;
  }

  submitOvertime(button: any) {
    let obj = this.form.getRawValue();
    console.log(obj)
    if (obj.accommodationId?.id) obj.accommodationId = obj.accommodationId.id;
    if (obj.pilotageId?.id) obj.pilotageId = obj.pilotageId.id;
    if (this.editMode) {
      obj.id = this.selectedRow.id;
      this.dataService.updateMovement(obj).subscribe((resp) => {
        this.getMovements();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Hareket başarıyla güncellendi',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
    } else {
      obj.tripId = this.tripId;
      this.dataService.addMovement(obj).subscribe((resp) => {
        this.getMovements();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Hareket başarıyla eklendi',
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
  }

  getMovements() {
    this.dataService.getAllMovmentsForTrip(this.tripId).subscribe((resp) => {
      this.movements = resp;
      // console.log(this.movements);
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  onDialogShow() {
    this.dataService.getAllAccommodations().subscribe((resp) => {
      this.accomodations = resp;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });

    this.objectSubscriber$ = this.formService
      .getFormObject()
      .subscribe((value) => {
        this.tripId = value.tripId;
        if (!this.tripId) {
          this.tripId = value.id;
        }
        if (this.tripId) {
          this.getMovements();
        }
        this.initializeForm();
        this.getCaptains();
      });
  }

  onDialogHide() {
    this.closeMovementsDialog.emit();
  }

  initializeForm() {
    this.form = this.fb.group({
      tripId: new FormControl(this.tripId, []),
      accommodationId: new FormControl(null, [Validators.required]),
      isPilotage: new FormControl(false, []),
      pilotageId: new FormControl(0, []),
      isFree: new FormControl(false, []),
      defectiveEngine: new FormControl(false, []),
      type: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
    });
  }

  checkValidity(formControl: string, boat = false) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  clearSelection() {
    this.selectedRow = '';
    this.editMode = false;
    this.form.reset();
  }

  // autocomplete functions

  getCaptains() {
    this.dataService.getAllCaptains('', 1, 10000).subscribe((resp) => {
      this.captains = resp.captainList.filter((x) => x.isGuidline === true);
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  filterCaptains(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.captains.length; i++) {
      let item = this.captains[i];
      if (
        item?.firstName?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        item?.lastName?.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(item);
      }
    }
    this.filteredCaptains = filtered;
  }
}
