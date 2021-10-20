import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-ship-registry-details',
  templateUrl: './ship-registry-details.component.html',
  styleUrls: ['./ship-registry-details.component.scss'],
})
export class ShipRegistryDetailsComponent implements OnInit {
  activeTab: string = 'Dashboard';
  shipId: any;
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

  pageSize = 50;
  pageNumber = 1;
  numberOfData: number;
  tripsTableData: any[];
  @ViewChild('paginator') paginator: Paginator;

  pageSize2 = 50;
  pageNumber2 = 1;
  numberOfData2: number;
  paymentsTableData: any[];
  @ViewChild('paginator2') paginator2: Paginator;

  selectedColumns: any[] = [];
  columns = [
    { value: 'source', name: 'Source' },
    { value: 'port', name: 'Port' },
    { value: 'destination', name: 'Destination' },
    { value: 'accommodation', name: 'Accommodation' },
    { value: 'sequenceNumber', name: 'Sequence Number' },
    { value: 'arrivalDate', name: 'Arrival Date' },
    { value: 'departureDate', name: 'Departure Date' },
    { value: 'inPort', name: 'In Port' },
  ];

  selectedColumns2: any[] = [];
  columns2 = [
    { value: 'id', name: 'Id' },
    { value: 'tripId', name: 'Trip Id' },
    { value: 'shipName', name: 'Ship Name' },
    { value: 'amount', name: 'Amount' },
    { value: 'type', name: 'Type' },
    { value: 'refrence', name: 'Refrence' },
    { value: 'rate', name: 'Rate' },
    { value: 'date', name: 'Date' },
  ];

  dateRanges: any = [new Date(2021, 0, 1), new Date()];

  dateRanges2: any = [new Date(2021, 0, 1), new Date()];

  shipDetails: any;
  shipDashboard: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private formService: FormService,
    private messageService: MessageService,
    private router: Router,
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.shipId = this.activatedRoute.snapshot.paramMap.get('id');
    this.shipTypes = this.dataService.shipTypes;
    this.countries = this.dataService.countries;

    this.dataService.getShipDashboard(this.shipId).subscribe((resp) => {
      // console.log(resp);
      this.shipDashboard = resp;
    });

    this.dataService.getShipDetail(this.shipId).subscribe(
      (resp) => {
        this.shipDetails = resp;
        if (
          this.shipDetails.country === 'KKTC' ||
          this.shipDetails.country === 'Northern Cyprus' ||
          this.shipDetails.country === 'Northern Cyprus (KKTC)' ||
          this.shipDetails.country === 'Northern Cyprus (TRNC)'
        ) {
          this.shipDetails.flag = this.countries[0];
        }
        if (
          this.shipDetails.country === 'KKTC' ||
          this.shipDetails.country === 'Northern Cyprus' ||
          this.shipDetails.country === 'Northern Cyprus (KKTC)' ||
          this.shipDetails.country === 'Northern Cyprus (TRNC)'
        ) {
          this.shipDetails.country = this.countries[0];
        }
        this.getAgencies();
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
    this.dataService.getShipExtra(this.shipId).subscribe((resp) => {
      // console.log(resp);
      this.initializeExtraInfoForm(resp);
    });
    this.dataService.getAllConstructionsForShip(this.shipId).subscribe(
      (resp) => {
        this.initializeConstructionForm(resp);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
    this.dataService.getAllSizesForShip(this.shipId).subscribe(
      (resp) => {
        this.initializeSizeForm(resp);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
    this.dataService.getAllEnginesForShip(this.shipId).subscribe(
      (resp) => {
        this.initializeEngineForm(resp);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Bir hata oluştu.',
        });
      }
    );
    this.initializeMortageForm();
    this.initializeOwnerForm();
    this.selectedColumns = [...this.columns];
    this.getTrips();

    this.selectedColumns2 = [...this.columns2];
    this.getPayments();
  }

  dateSelection() {
    this.getTrips();
  }

  dateSelection2() {
    this.getPayments();
  }

  getPayments() {
    this.dataService
      .getAllPayments(
        this.pageNumber2,
        this.pageSize2,
        this.dateRanges2[0]
          ? this.dateRanges2[0].toISOString().split('T')[0]
          : '',
        this.dateRanges2[1]
          ? this.dateRanges2[1].toISOString().split('T')[0]
          : '',
        this.shipId,
        null
      )
      .subscribe(
        (resp) => {
          this.paymentsTableData = resp.paymentList;
          this.numberOfData2 = resp.pagingInfo.totalCount;
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

  getTrips() {
    this.dataService
      .getAllTrips(
        this.dateRanges[0]
          ? this.dataService.convertDateTimeToIso(this.dateRanges[0]).split('T')[0]
          : '',
        this.dateRanges[1]
          ? this.dataService.convertDateTimeToIso(this.dateRanges[1]).split('T')[0]
          : '',
        this.pageNumber,
        this.pageSize,
        '',
        this.shipId
      )
      .subscribe(
        (resp) => {
          this.tripsTableData = resp.trips;
          this.numberOfData = resp.pagingInfo.totalCount;
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

  pageChange(event: any) {
    this.pageNumber = event.page + 1;
    this.getTrips();
  }

  pageChange2(event: any) {
    this.pageNumber2 = event.page + 1;
    this.getPayments();
  }

  toolbarItems: any[] = [
    { label: 'Dashboard', isActive: true, locked: false },
    { label: 'Ship Information', isActive: false, locked: false },
    { label: 'Extra Information', isActive: false, locked: false },
    { label: 'Construction', isActive: false, locked: false },
    { label: 'Size', isActive: false, locked: false },
    { label: 'Engine', isActive: false, locked: false },
    { label: 'Mortage', isActive: false, locked: false },
    { label: 'Owner', isActive: false, locked: false },
    { label: 'Trips', isActive: false, locked: false },
    { label: 'Payments', isActive: false, locked: false },
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
    this.router.navigate(['/ship-registry']);
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

  initializeShipInfoForm(obj) {
    false;

    this.shipInformation = new FormGroup({
      name: new FormControl(obj?.shipName, [Validators.required]),
      agencyId: new FormControl(
        this.agencies.find((x) => x.id === obj.agencyId),
        [Validators.required]
      ),
      type: new FormControl(obj?.type, [Validators.required]),
      country: new FormControl(obj?.country, [Validators.required]),
      flag: new FormControl(obj?.flag, [Validators.required]),
      leangth: new FormControl(obj?.leangth, [Validators.required]),
      grt: new FormControl(obj?.grt, [Validators.required]),
      nrt: new FormControl(obj?.nrt, [Validators.required]),
      dwt: new FormControl(obj?.dwt, [Validators.required]),
      isLocal: new FormControl(true, [Validators.required]),
    });
  }

  initializeExtraInfoForm(obj: any) {
    this.getCaptains();
    this.extraInformation = new FormGroup({
      shipId: new FormControl(null),
      mdrAdress: new FormControl(obj?.mdrAddress, [Validators.required]),
      captainId: new FormControl(obj?.captainId, [Validators.required]),
      m3: new FormControl(obj?.m3, [Validators.required]),
      netM3: new FormControl(obj?.netM3, [Validators.required]),
      speed: new FormControl(obj?.speed, [Validators.required]),
      orderNo: new FormControl(obj?.orderNo, [Validators.required]),
      exactRegistrationDate: new FormControl(
        new Date(obj?.exactRegistrationDate),
        [Validators.required]
      ),
      expertPrice: new FormControl(obj?.expertPrice, [Validators.required]),
      imoNumber: new FormControl(obj?.imoNumber, [Validators.required]),
      number: new FormControl(obj?.number, [Validators.required]),
      sailBoatDescription: new FormControl(obj?.sailBoatDescription, [
        Validators.required,
      ]),
      builder: new FormControl(obj?.builder, [Validators.required]),
      builderAddress: new FormControl(obj?.builderAddress, [
        Validators.required,
      ]),
      numberOfSeamen: new FormControl(obj?.numberOfSeamen, [
        Validators.required,
      ]),
      callSign: new FormControl(obj?.callSign, [Validators.required]),
      engineType: new FormControl(obj?.engineType, [Validators.required]),
      enginePower: new FormControl(obj?.enginePower, [Validators.required]),
      sliceCount: new FormControl(obj?.sliceCount, [Validators.required]),
      brakeHorsePower: new FormControl(obj?.brakeHorsePower, [
        Validators.required,
      ]),
      registrationNumber: new FormControl(obj?.registrationNumber, [
        Validators.required,
      ]),
      registrationPort: new FormControl(obj?.registrationPort, [
        Validators.required,
      ]),
      status: new FormControl(obj?.status, [Validators.required]),
      code: new FormControl(obj?.code, [Validators.required]),
      tempDate: new FormControl(new Date(obj?.tempDate), [Validators.required]),
      constructionSite: new FormControl(obj?.constructionSite, [
        Validators.required,
      ]),
      constructionDate: new FormControl(new Date(obj?.constructionDate), [
        Validators.required,
      ]),
      director: new FormControl(obj?.director, [Validators.required]),
      kw: new FormControl(obj?.kw, [Validators.required]),
    });
  }

  initializeConstructionForm(obj: any) {
    this.construction = new FormGroup({
      shipId: new FormControl(null),
      numberOfDecks: new FormControl(obj?.numberOfDecks, [Validators.required]),
      headOfShip: new FormControl(obj?.headOfShip, [Validators.required]),
      backOfShip: new FormControl(obj?.backOfShip, [Validators.required]),
      structure: new FormControl(obj?.structure, [Validators.required]),
      numberOfPole: new FormControl(obj?.numberOfPole, [Validators.required]),
      hardware: new FormControl(obj?.hardware, [Validators.required]),
      sectionOfShip: new FormControl(obj?.sectionOfShip, [Validators.required]),
      frameFormat: new FormControl(obj?.frameFormat, [Validators.required]),
      description: new FormControl(obj?.description, [Validators.required]),
    });
  }

  initializeSizeForm(obj: any) {
    this.size = new FormGroup({
      shipId: new FormControl(null),
      frontLength: new FormControl(obj?.frontLength, [Validators.required]),
      width: new FormControl(obj?.width, [Validators.required]),
      fullSize: new FormControl(obj?.fullSize, [Validators.required]),
      depth1: new FormControl(obj?.depth1, [Validators.required]),
      depth2: new FormControl(obj?.depth2, [Validators.required]),
      depth3: new FormControl(obj?.depth3, [Validators.required]),
      depth4: new FormControl(obj?.depth4, [Validators.required]),
    });
  }

  initializeEngineForm(obj: any) {
    this.engine = new FormGroup({
      shipId: new FormControl(null),
      machineCount: new FormControl(obj?.machineCount, [Validators.required]),
      cylinderDiameter: new FormControl(obj?.cylinderDiameter, [
        Validators.required,
      ]),
      cylinderCount: new FormControl(obj?.cylinderCount, [Validators.required]),
      timeOfPower_1: new FormControl(obj?.timeOfPower_1, [Validators.required]),
      timeOfPower_2: new FormControl(obj?.timeOfPower_2, [Validators.required]),
      estimatedHorsePower: new FormControl(obj?.estimatedHorsePower, [
        Validators.required,
      ]),
      name: new FormControl(obj?.name, [Validators.required]),
      yearMade: new FormControl(obj?.yearMade, [Validators.required]),
      estimatedSpeed: new FormControl(obj?.estimatedSpeed, [
        Validators.required,
      ]),
      createrName: new FormControl(obj?.createrName, [Validators.required]),
      createrAddress: new FormControl(obj?.createrAddress, [
        Validators.required,
      ]),
      motorDetail: new FormControl(obj?.motorDetail, [Validators.required]),
      machineArmsCount: new FormControl(obj?.machineArmsCount, [
        Validators.required,
      ]),
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
    this.dataService.getAllAgencies('', '', 1, 10000).subscribe(
      (resp) => {
        this.agencies = resp.agencyList;
        this.initializeShipInfoForm(this.shipDetails);
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

  getCaptains() {
    this.dataService.getAllCaptains('', 1, 10000).subscribe(
      (resp) => {
        this.captains = resp.captainList;
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

  getCurrencies() {
    this.dataService.getAllCurrencies().subscribe(
      (resp) => {
        this.currencies = resp;
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
      this.dataService.addNewShip(obj).subscribe(
        (resp: any) => {
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
        }
      );
    } else {
      this.dataService.getShipDetail(this.shipId).subscribe(
        (resp) => {
          const detailId = resp.id;
          let obj = this.shipInformation.getRawValue();
          if (obj.agencyId.hasOwnProperty('id')) obj.agencyId = obj.agencyId.id;
          obj.shipId = this.shipId;
          obj.id = detailId;
          this.dataService.updateShipDetail(obj).subscribe(
            (resp: any) => {
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
            }
          );
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
  }

  submitExtra() {
    if (!this.extraId) {
      let obj = this.extraInformation.getRawValue();
      if (obj.captainId.hasOwnProperty('id')) obj.captainId = obj.captainId.id;
      obj.shipId = this.shipId;
      this.dataService.addNewShipExtra(obj).subscribe(
        (resp: any) => {
          this.dataService.getShipExtra(this.shipId).subscribe(
            (resp) => {
              this.extraId = resp.id;
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Bir hata oluştu.',
              });
            }
          );
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
        }
      );
    } else {
      let obj = this.extraInformation.getRawValue();
      if (obj.captainId.hasOwnProperty('id')) obj.captainId = obj.captainId.id;
      obj.shipId = this.shipId;
      obj.id = this.extraId;
      this.dataService.updateShipExtra(obj).subscribe(
        (resp: any) => {
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
        }
      );
    }
  }

  submitConstruction() {
    if (!this.constructionId) {
      let obj = this.construction.getRawValue();
      obj.shipId = this.shipId;
      this.dataService.addNewShipConstruction(obj).subscribe(
        (resp: any) => {
          this.dataService.getAllConstructionsForShip(this.shipId).subscribe(
            (resp) => {
              this.constructionId = resp.id;
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Bir hata oluştu.',
              });
            }
          );
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
        }
      );
    } else {
      let obj = this.construction.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.constructionId;
      this.dataService.updateShipConstruction(obj).subscribe(
        (resp: any) => {
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
        }
      );
    }
  }

  submitSize() {
    if (!this.sizeId) {
      let obj = this.size.getRawValue();
      obj.shipId = this.shipId;
      this.dataService.addNewShipSize(obj).subscribe(
        (resp: any) => {
          this.dataService.getAllSizesForShip(this.shipId).subscribe(
            (resp) => {
              this.sizeId = resp.id;
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Bir hata oluştu.',
              });
            }
          );
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
        }
      );
    } else {
      let obj = this.size.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.sizeId;
      this.dataService.updateShipSize(obj).subscribe(
        (resp: any) => {
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
        }
      );
    }
  }

  submitEngine() {
    if (!this.engineId) {
      let obj = this.engine.getRawValue();
      obj.shipId = this.shipId;
      this.dataService.addNewShipEngine(obj).subscribe(
        (resp: any) => {
          this.dataService.getAllEnginesForShip(this.shipId).subscribe(
            (resp) => {
              this.engineId = resp.id;
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Bir hata oluştu.',
              });
            }
          );
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
        }
      );
    } else {
      let obj = this.size.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.engineId;
      this.dataService.updateShipEngine(obj).subscribe(
        (resp: any) => {
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
        }
      );
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
      this.dataService.addNewShipMortage(obj).subscribe(
        (resp: any) => {
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
        }
      );
    } else {
      let obj = this.mortage.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.mortageId;
      if (obj.currencyId.id) obj.currencyId = obj.currencyId.id;
      this.dataService.updateMortage(obj).subscribe(
        (resp: any) => {
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
        }
      );
    }
  }

  getAllMortages() {
    this.dataService.getAllMortagesForShip(this.shipId).subscribe(
      (resp) => {
        this.mortages = resp;
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
    this.dataService.updateMortage(obj).subscribe(
      (resp) => {
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
      }
    );
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
      this.dataService.addNewShipOwner(obj).subscribe(
        (resp: any) => {
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
        }
      );
    } else {
      let obj = this.owner.getRawValue();
      obj.shipId = this.shipId;
      obj.id = this.ownerId;
      if (obj.currencyId.id) obj.currencyId = obj.currencyId.id;
      if (obj.agencyId.id) obj.agencyId = obj.agencyId.id;
      this.dataService.updateOwner(obj).subscribe(
        (resp: any) => {
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
        }
      );
    }
  }

  getAllOwners() {
    this.dataService.getAllOwnersForShip(this.shipId).subscribe(
      (resp) => {
        this.owners = resp;
        // console.log(this.owners);
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
    this.dataService.updateOwner(obj).subscribe(
      (resp) => {
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
      }
    );
    this.addNewOwner();
  }


  deleteShip() {
    const obj = { id: this.shipId, isDeleted: true };
    this.dataService.updateShip(obj).subscribe(
      (resp) => {
        this.router.navigate(['/ship-registry']);
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Gemi başarıyla silindi',
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
  }







  
  // reports work
  @ViewChild('report_menu') report_menu: Menu;


  reportVar1
  reportVar2
  reportIsAlternative
  displayTelerikDialog
  telerik
  showTelerikReport( var2 = '', var1 = '', isAlternative = false) {

    this.reportVar1 = var1;
    this.reportVar2 = var2;

    if (isAlternative) {
      this.reportIsAlternative = 'true';
    } else {
      this.reportIsAlternative = 'false';
    }

    this.displayTelerikDialog = true;
    this.telerik = true;
  }

  
  objToSend: any = null;

  reportOptionsMenuFull = [
    {
      label: this.translate.instant('Ship Form'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'ship');
      },
    },
    {
      label: this.translate.instant('Ship Invoice'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'total');
      },
    },
    {
      label: this.translate.instant('Crane 1'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'crane/invoice');
      },
    },
    {
      label: this.translate.instant('Crane 2'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'crane/invoice', true);
      },
    },
    {
      label: this.translate.instant('Boat Invoice'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'boat/invoice');
      },
    },
  ]


  reportOptionsMenu: MenuItem[] = [
    {
      items: [

      ],
    },
  ];

  toggleMenuReports(item, event) {
    debugger
    this.objToSend = item;

    this.reportOptionsMenu[0].items = [];
    if(item.shipInvoice)
    {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[0])
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[1])
    }
    if(item.craneInvoice)
    {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[2])
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[3])
    }
    if(item.boatInvoice)
    {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[4])
    }

    this.report_menu.toggle(event);
  }
}
