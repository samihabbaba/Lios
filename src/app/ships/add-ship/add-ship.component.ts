import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-add-ship',
  templateUrl: './add-ship.component.html',
  styleUrls: ['./add-ship.component.scss'],
})
export class AddShipComponent implements OnInit {
  activeTab: string = 'Ship Information';
  shipId: string;
  extraId: string;
  constructionId: string;
  sizeId: string;
  engineId: string;
  mortageId: string;
  ownerId: string;

  // form variables
  shipInformation: FormGroup;
  extraInformation: FormGroup;
  construction: FormGroup;
  size: FormGroup;
  engine: FormGroup;
  mortage: FormGroup;
  owner: FormGroup;

  // Dropdown Variables
  shipTypes: any[];
  countries: any[];
  currencies: any[];

  // AutoComplete Variables
  agencies: any[];
  filteredAgencies: any[] = [];
  captains: any[];
  filteredCaptains: any[] = [];

  // Table Variables
  mortages: any[];
  owners: any[];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private formService: FormService,
    private messageService: MessageService,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.shipTypes = this.dataService.shipTypes;
    this.countries = this.dataService.countries;
    this.initializeShipInfoForm();
    this.initializeExtraInfoForm();
    this.initializeConstructionForm();
    this.initializeSizeForm();
    this.initializeEngineForm();
    this.initializeMortageForm();
    this.initializeOwnerForm();
  }

  toolbarItems: any[] = [
    // { label: 'Dashboard', isActive: true, locked: true },
    { label: 'Ship Information', isActive: true, locked: false },
    { label: 'Extra Information', isActive: false, locked: true },
    { label: 'Construction', isActive: false, locked: true },
    { label: 'Size', isActive: false, locked: true },
    { label: 'Engine', isActive: false, locked: true },
    { label: 'Mortage', isActive: false, locked: true },
    { label: 'Owner', isActive: false, locked: true },
    // { label: 'Trips', isActive: false , locked: true},
    // { label: 'Payments', isActive: false , locked: true},
  ];

  changeActiveTab(item: any) {
    if (item.isActive) {
      return;
    } else {
      this.toolbarItems.forEach((x) => {
        x.isActive = false;
      });
      item.isActive = true;
      this.activeTab = item.label;
    }
  }

  goBack() {
    this.router.navigate(['/ships']);
  }

  checkValidity(formControl: string, form: FormGroup) {
    return form.get(formControl)?.touched && form.get(formControl)?.invalid;
  }

  unlockTabs() {
    this.toolbarItems.forEach((x) => {
      x.locked = false;
    });
  }

  testing() {
    this.shipInformation.get('name')?.patchValue('1');
    this.shipInformation.get('agencyId')?.patchValue(12);
    this.shipInformation.get('type')?.patchValue('Research');
    this.shipInformation.get('country')?.patchValue('Afganistan');
    this.shipInformation.get('flag')?.patchValue('Afganistan');
    this.shipInformation.get('leangth')?.patchValue(1);
    this.shipInformation.get('grt')?.patchValue(1);
    this.shipInformation.get('nrt')?.patchValue(1);
    this.shipInformation.get('dwt')?.patchValue(1);
    this.shipInformation.updateValueAndValidity();
    this.submitShip();
  }

  initializeShipInfoForm() {
    this.getAgencies();
    this.shipInformation = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      agencyId: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      flag: new FormControl(null, [Validators.required]),
      leangth: new FormControl(null, [Validators.required]),
      grt: new FormControl(null, [Validators.required]),
      nrt: new FormControl(null, [Validators.required]),
      dwt: new FormControl(null, [Validators.required]),
      isLocal: new FormControl(false, [Validators.required]),
    });
  }

  initializeExtraInfoForm() {
    this.getCaptains();
    this.extraInformation = new FormGroup({
      shipId: new FormControl(null),
      mdrAdress: new FormControl(null, [Validators.required]),
      captainId: new FormControl(null, [Validators.required]),
      m3: new FormControl(null, [Validators.required]),
      netM3: new FormControl(null, [Validators.required]),
      speed: new FormControl(null, [Validators.required]),
      orderNo: new FormControl(null, [Validators.required]),
      exactRegistrationDate: new FormControl(new Date(), [Validators.required]),
      expertPrice: new FormControl(null, [Validators.required]),
      imoNumber: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      sailBoatDescription: new FormControl(null, [Validators.required]),
      builder: new FormControl(null, [Validators.required]),
      builderAddress: new FormControl(null, [Validators.required]),
      numberOfSeamen: new FormControl(null, [Validators.required]),
      callSign: new FormControl(null, [Validators.required]),
      engineType: new FormControl(null, [Validators.required]),
      enginePower: new FormControl(null, [Validators.required]),
      sliceCount: new FormControl(null, [Validators.required]),
      brakeHorsePower: new FormControl(null, [Validators.required]),
      registrationNumber: new FormControl(null, [Validators.required]),
      registrationPort: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      tempDate: new FormControl(new Date(), [Validators.required]),
      constructionSite: new FormControl(null, [Validators.required]),
      constructionDate: new FormControl(new Date(), [Validators.required]),
      director: new FormControl(null, [Validators.required]),
      kw: new FormControl(null, [Validators.required]),
    });
  }

  initializeConstructionForm() {
    this.construction = new FormGroup({
      shipId: new FormControl(null),
      numberOfDecks: new FormControl(null, [Validators.required]),
      headOfShip: new FormControl(null, [Validators.required]),
      backOfShip: new FormControl(null, [Validators.required]),
      structure: new FormControl(null, [Validators.required]),
      numberOfPole: new FormControl(null, [Validators.required]),
      hardware: new FormControl(null, [Validators.required]),
      sectionOfShip: new FormControl(null, [Validators.required]),
      frameFormat: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  initializeSizeForm() {
    this.size = new FormGroup({
      shipId: new FormControl(null),
      frontLength: new FormControl(null, [Validators.required]),
      width: new FormControl(null, [Validators.required]),
      fullSize: new FormControl(null, [Validators.required]),
      depth1: new FormControl(null, [Validators.required]),
      depth2: new FormControl(null, [Validators.required]),
      depth3: new FormControl(null, [Validators.required]),
      depth4: new FormControl(null, [Validators.required]),
    });
  }

  initializeEngineForm() {
    this.engine = new FormGroup({
      shipId: new FormControl(null),
      machineCount: new FormControl(null, [Validators.required]),
      cylinderDiameter: new FormControl(null, [Validators.required]),
      cylinderCount: new FormControl(null, [Validators.required]),
      timeOfPower_1: new FormControl(null, [Validators.required]),
      timeOfPower_2: new FormControl(null, [Validators.required]),
      estimatedHorsePower: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      yearMade: new FormControl(null, [Validators.required]),
      estimatedSpeed: new FormControl(null, [Validators.required]),
      createrName: new FormControl(null, [Validators.required]),
      createrAddress: new FormControl(null, [Validators.required]),
      motorDetail: new FormControl(null, [Validators.required]),
      machineArmsCount: new FormControl(null, [Validators.required]),
    });
  }

  initializeMortageForm() {
    this.getAllMortages();
    this.getCurrencies();
    this.mortage = new FormGroup({
      shipId: new FormControl(null),
      orderNo: new FormControl(null, [Validators.required]),
      recordOrderNo: new FormControl(null, [Validators.required]),
      changesName: new FormControl(null, [Validators.required]),
      delitions: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      establishmentDate: new FormControl(new Date(), [Validators.required]),
      currencyId: new FormControl(null, [Validators.required]),
    });
  }

  initializeOwnerForm() {
    this.getAllOwners();
    this.owner = new FormGroup({
      shipId: new FormControl(null),
      ownerName: new FormControl(null, [Validators.required]),
      partnerName: new FormControl(null, [Validators.required]),
      sliceCount: new FormControl(null, [Validators.required]),
      percentage: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      rate: new FormControl(new Date(), [Validators.required]),
      placeOffIssue: new FormControl(null, [Validators.required]),
      expiryDate: new FormControl(new Date(), [Validators.required]),
      dateOfIssue: new FormControl(new Date(), [Validators.required]),
      exchangeDate: new FormControl(new Date(), [Validators.required]),
      currencyId: new FormControl(null, [Validators.required]),
      agencyId: new FormControl(null, [Validators.required]),
    });
  }

  getAgencies() {
    this.dataService.getAllAgencies('', '', 1, 10000).subscribe((resp) => {
      this.agencies = resp.agencyList;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  getCaptains() {
    this.dataService.getAllCaptains('', 1, 10000).subscribe((resp) => {
      this.captains = resp.captainList;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  getCurrencies() {
    this.dataService.getAllCurrencies().subscribe((resp) => {
      this.currencies = resp;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  // Filtering autoCompletes
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

  // Submit Functions
  submitShip() {
    if (this.toolbarItems[3].locked) {
      let obj = this.shipInformation.getRawValue();
      if (obj.agencyId.hasOwnProperty('id')) obj.agencyId = obj.agencyId.id;
      this.dataService.addNewShip(obj).subscribe((resp: any) => {
        this.shipId = resp.body.id;
        this.unlockTabs();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Yeni gemi başarıyla eklendi',
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
      this.dataService.getShipDetail(this.shipId).subscribe((resp) => {
        const detailId = resp.id;
        let obj = this.shipInformation.getRawValue();
        if (obj.agencyId.hasOwnProperty('id')) obj.agencyId = obj.agencyId.id;
        obj.shipId = this.shipId;
        obj.id = detailId;
        this.dataService.updateShipDetail(obj).subscribe((resp: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Gemi bilgileri başarıyla güncellendi',
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
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      });
    }
  }

  submitExtra() {
    if (!this.extraId) {
      let obj = this.extraInformation.getRawValue();
      if (obj.captainId.hasOwnProperty('id')) obj.captainId = obj.captainId.id;
      obj.shipId = this.shipId;
      this.dataService.addNewShipExtra(obj).subscribe((resp: any) => {
        this.dataService.getShipExtra(this.shipId).subscribe((resp) => {
          this.extraId = resp.id;
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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
      let obj = this.extraInformation.getRawValue();
      if (obj.captainId.hasOwnProperty('id')) obj.captainId = obj.captainId.id;
      obj.shipId = this.shipId;
      obj.id = this.extraId;
      this.dataService.updateShipExtra(obj).subscribe((resp: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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

  submitConstruction() {
    if (!this.constructionId) {
      let obj = this.construction.getRawValue();
      obj.shipId = this.shipId;
      this.dataService.addNewShipConstruction(obj).subscribe((resp: any) => {
        this.dataService
          .getAllConstructionsForShip(this.shipId)
          .subscribe((resp) => {
            this.constructionId = resp.id;
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Bir hata oluştu.',
            });
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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
      let obj = this.construction.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.constructionId;
      this.dataService.updateShipConstruction(obj).subscribe((resp: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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

  submitSize() {
    if (!this.sizeId) {
      let obj = this.size.getRawValue();
      obj.shipId = this.shipId;
      this.dataService.addNewShipSize(obj).subscribe((resp: any) => {
        this.dataService.getAllSizesForShip(this.shipId).subscribe((resp) => {
          this.sizeId = resp.id;
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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
      let obj = this.size.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.sizeId;
      this.dataService.updateShipSize(obj).subscribe((resp: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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

  submitEngine() {
    if (!this.engineId) {
      let obj = this.engine.getRawValue();
      obj.shipId = this.shipId;
      this.dataService.addNewShipEngine(obj).subscribe((resp: any) => {
        this.dataService.getAllEnginesForShip(this.shipId).subscribe((resp) => {
          this.engineId = resp.id;
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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
      let obj = this.size.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.engineId;
      this.dataService.updateShipEngine(obj).subscribe((resp: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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

  submitMortage() {
    // debugger;
    if (!this.mortageId) {
      let obj = this.mortage.getRawValue();
      obj.shipId = this.shipId;
      if (obj.currencyId?.hasOwnProperty('id')) {
        obj.currencyId = obj.currencyId.id;
      }
      this.dataService.addNewShipMortage(obj).subscribe((resp: any) => {
        this.mortageId = resp.body.id;
        this.getAllMortages();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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
      let obj = this.mortage.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.mortageId;
      if (obj.currencyId.id) obj.currencyId = obj.currencyId.id;
      this.dataService.updateMortage(obj).subscribe((resp: any) => {
        this.getAllMortages();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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

  getAllMortages() {
    this.dataService.getAllMortagesForShip(this.shipId).subscribe((resp) => {
      this.mortages = resp;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  addNewMortage() {
    this.mortageId = '';
    this.mortage.reset();
  }

  editMortage(item: any) {
    this.mortageId = item.id;
    item.establishmentDate = new Date(item.establishmentDate);
    this.mortage.patchValue(item);
  }

  deleteMortage(item: any, index: any) {
    this.mortages.splice(index, 1);
    let obj = item;
    delete obj.shipId;
    delete obj.shipName;
    delete obj.currencyCode;
    obj.isDeleted = true;
    this.dataService.updateMortage(obj).subscribe((resp) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Kayıt başarıyla silindi',
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
    this.addNewMortage();
  }

  submitOwner() {
    // debugger;
    if (!this.ownerId) {
      let obj = this.owner.getRawValue();
      obj.shipId = this.shipId;
      if (obj.currencyId?.hasOwnProperty('id')) {
        obj.currencyId = obj.currencyId.id;
      }
      if (obj.agencyId?.hasOwnProperty('id')) {
        obj.agencyId = obj.agencyId.id;
      }
      this.dataService.addNewShipOwner(obj).subscribe((resp: any) => {
        this.ownerId = resp.body.id;
        this.getAllOwners();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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
      let obj = this.owner.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.ownerId;
      if (obj.currencyId.id) obj.currencyId = obj.currencyId.id;
      if (obj.agencyId.id) obj.agencyId = obj.agencyId.id;
      this.dataService.updateOwner(obj).subscribe((resp: any) => {
        this.getAllOwners();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Gemi bilgileri başarıyla güncellendi',
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

  getAllOwners() {
    this.dataService.getAllOwnersForShip(this.shipId).subscribe((resp) => {
      this.owners = resp;
      console.log(this.owners);
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  addNewOwner() {
    this.ownerId = '';
    this.owner.reset();
  }

  editOwner(item: any) {
    this.ownerId = item.id;
    item.expiryDate = new Date(item.expiryDate);
    item.dateOfIssue = new Date(item.dateOfIssue);
    item.exchangeDate = new Date(item.exchangeDate);
    this.owner.patchValue(item);
  }

  deleteOwner(item: any, index: any) {
    this.owners.splice(index, 1);
    let obj = item;
    delete obj.shipId;
    obj.isDeleted = true;
    this.dataService.updateOwner(obj).subscribe((resp) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Kayıt başarıyla silindi',
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
    this.addNewOwner();
  }
}
