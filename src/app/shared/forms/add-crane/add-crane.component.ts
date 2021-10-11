import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-add-crane',
  templateUrl: './add-crane.component.html',
  styleUrls: ['./add-crane.component.scss'],
})
export class AddCraneComponent implements OnInit {
  objectSubscriber$: Subscription;
  submitSubscriber$: Subscription;
  formValidationSubscriber$: Subscription;
  dirtyFormSubscriber$: Subscription;
  form: FormGroup;

  dropdownOptions: any[];

  services: any[] = [];
  filteredServices: any;

  ships: any[] = [];
  filteredShips: any;

  agencies: any[] = [];
  filteredAgencies: any;

  weightDropdown: any = [
    { label: '20" Container', value: 20 },
    { label: '30" Container', value: 30 },
    { label: '40" Container', value: 40 },
    { label: '40" Ultra Container', value: 50 },
  ];

  constructor(
    private dataService: DataService,
    private formService: FormService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogRef: Dialog,
    public translate: TranslateService
  ) {
    this.dialogRef.onShow.subscribe(() => {
      this.initializeForm();
      this.loadCraneServices();
      this.loadShips();
      this.loadAgencies();
      this.loadSubscriptions();
    });
    this.dialogRef.onHide.subscribe(() => {
      this.destroySubscription();
    });
  }

  ngOnInit() {}

  loadSubscriptions() {
    // this.objectSubscriber$ = this.formService
    //   .getFormObject()
    //   .subscribe((value) => {
    //     console.log(value);
    //   });

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
    // this.objectSubscriber$.unsubscribe();
    this.submitSubscriber$.unsubscribe();
    this.formValidationSubscriber$.unsubscribe();
    this.dirtyFormSubscriber$.unsubscribe();
    this.formService.resetForm();
  }

  submitForm() {
    let obj = this.form.getRawValue();
    if (obj.serviceId?.id) obj.serviceId = obj.serviceId?.id;
    if (obj.shipId?.id) obj.shipId = obj.shipId?.id;
    if (obj.agencyId?.id) obj.agencyId = obj.agencyId?.id;
    // console.log(obj);
    if (!obj.serviceId && !obj.shipId && !obj.agencyId) {
      return;
    }
    this.dataService.addNewCrane(obj).subscribe((response) => {
      this.formService.triggerRefresh();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Yeni vinç başarıyla eklendi',
      });
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      serviceId: new FormControl(null, [Validators.required]),
      shipId: new FormControl(null, [Validators.required]),
      agencyId: new FormControl(null, [Validators.required]),
      weight: new FormControl(0, []),
      quantity: new FormControl(0, []),
      start: new FormControl(new Date(), []),
      end: new FormControl(new Date(), []),
    });
  }

  checkValidity(formControl: string) {
    return (
      this.form.get(formControl)?.touched && this.form.get(formControl)?.invalid
    );
  }

  // AutoCompletes

  filterServices(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.services.length; i++) {
      let item = this.services[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filteredServices = filtered;
  }

  loadCraneServices() {
    this.dataService.getAllCraneServices().subscribe((response) => {
      this.services = response;
      // console.log(this.services);
    });
  }

  filterShips(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.ships.length; i++) {
      let item = this.ships[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filteredShips = filtered;
  }

  loadShips() {
    this.dataService
      .getAllShips('', 10000, 1, false, true)
      .subscribe((response) => {
        this.ships = response.shipList;
        // console.log(this.ships);
      });
  }

  filterAgencies(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.agencies.length; i++) {
      let item = this.agencies[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filteredAgencies = filtered;
  }

  loadAgencies() {
    this.dataService
      .getAllAgencies('', 10000, 1, false)
      .subscribe((response) => {
        this.agencies = response.agencyList;
        // console.log(this.agencies);
      });
  }

  ////// field Conditions

  quantityFieldCondition() {
    const field = this.form.controls.serviceId.value?.name;

    if (
      field === 'A (BULK LOAD)' ||
      field === 'A (IRON LOAD)' ||
      field === 'B (WEIGHT)' ||
      field === 'C.1 (WEIGHT)' ||
      field === 'D.1 (WEIGHT)' ||
      // ||this.currentService === 'G (PHÖNOMATİK)'
      field === 'E.1 (FULL CONTAINER)' ||
      field === 'E.2 (EMPTY CONTAINER)' ||
      field === 'C.2.A (FULL CONTAINER)' ||
      field === 'C.2.B (EMPTY CONTAINER)'
    ) {
      return true;
    }
    return false;
  }

  weightTonnagePlaceholderCondition() {
    const field = this.form.controls.serviceId.value?.name;
    if (field === 'G (PHÖNOMATİK)') {
      return true;
    }
    return false;
  }

  weightFieldCondition() {
    const field = this.form.controls.serviceId.value?.name;
    if (
      field === 'B (WEIGHT)' ||
      field === 'C.1 (WEIGHT)' ||
      field === 'D.1 (WEIGHT)'
    ) {
      return true;
    }
    return false;
  }

  quantityPlaceholderCondition(): string {
    const field = this.form.controls.serviceId.value?.name;
    if (
      field === 'B (WEIGHT)' ||
      field === 'D.1 (WEIGHT)' ||
      field === 'C.1 (WEIGHT)' ||
      field === 'C.2.A (FULL CONTAINER)' ||
      field === 'C.2.B (EMPTY CONTAINER)'
    ) {
      return 'Lift';
    }

    if (field === 'A (BULK LOAD)' || field === 'A (IRON LOAD)') {
      return 'Tonnage';
    }

    if (field === 'E.1 (FULL CONTAINER)' || field === 'E.2 (EMPTY CONTAINER)') {
      return 'Number of Containers';
    }
    return 'Miktar';
  }

  dropdownConition() {
    const field = this.form.controls.serviceId.value?.name;
    if (
      field === 'E.1 (FULL CONTAINER)' ||
      field === 'E.2 (EMPTY CONTAINER)' ||
      field === 'C.2.A (FULL CONTAINER)' ||
      field === 'C.2.B (EMPTY CONTAINER)'
    ) {
      return true;
    }
    return false;
  }

  ultraConition() {
    const field = this.form.controls.serviceId.value?.name;
    if (field === 'E.1 (FULL CONTAINER)' || field === 'E.2 (EMPTY CONTAINER)') {
      return true;
    }
    return false;
  }

  showDateForCrane() {
    const field = this.form.controls.serviceId.value?.name;
    if (
      field === 'A (BULK LOAD)' ||
      field === 'A (IRON LOAD)' ||
      field === 'B (WEIGHT)' ||
      field === 'C.1 (WEIGHT)' ||
      field === 'C.2.A (FULL CONTAINER)' ||
      field === 'C.2.B (EMPTY CONTAINER)' ||
      field === 'D.1 (WEIGHT)' ||
      field === 'E.1 (FULL CONTAINER)' ||
      field === 'E.2 (EMPTY CONTAINER)' ||
      field === 'G (PHÖNOMATİK)'
    ) {
      return false;
    }
    return true;
  }
}
