import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { StringResources } from './stringResources';

@Component({
  selector: 'app-telerik-viewer',
  templateUrl: './telerik-viewer.component.html',
  styleUrls: ['./telerik-viewer.component.scss'],
})
export class TelerikViewerComponent implements OnInit {
  @ViewChild('viewer1', { static: false }) viewer: TelerikReportViewerComponent;

  @Input() var1: any;
  @Input() var2: any;
  @Input() isAlternative: any;
  @Input() input: any;

  param: any = {};
  load = false;

  token;
  reportForm = '';
  fullUrl = '';
  baseUrl = 'https://api.lios3.xyz/api/v1/report/';
  ngOnInit(): void {
    this.fullUrl = this.baseUrl + this.var1 + '/' + this.var2;

    console.log(this.fullUrl);
    this.param.Url = this.fullUrl;
    this.param.isAlternative = this.isAlternative;

    if (this.var1 === 'ship') {
      this.reportForm = 'Lios/ShipForm';
    } else if (this.var1 === 'total') {
      this.reportForm = 'Lios/ShipInvoice';
    } else if (this.var1 === 'overtime') {
      this.reportForm = 'Lios/OvertimeInquiry';
    } else if (this.var1 === 'boat/invoice') {
      this.reportForm = 'Lios/BoatInvoice';
    } else if (this.var1 === 'boat') {
      this.reportForm = 'Lios/BoatInquiry';
    } else if (this.var1 === 'total2') {
      this.var1 = 'total';
      this.fullUrl = this.baseUrl + this.var1 + '/' + this.var2;
      this.param.Url = this.fullUrl;

      // this.reportForm = 'Lios/CraneInvoice'
      this.reportForm = 'Lios/CraneFatura';
    } else if (this.var1 === 'total3') {
      this.var1 = 'total';
      this.fullUrl = this.baseUrl + this.var1 + '/' + this.var2;
      this.param.Url = this.fullUrl;

      // this.reportForm = 'Lios/CraneInvoice'
      this.reportForm = 'Lios/ShipFatura';
    } else if (this.var1 === 'crane/invoice' || this.var1 === 'crane/payment') {
      // if(this.var2 === 'true'){
      //   this.reportForm = 'Lios/CraneInvoice'
      // } else{
      //   this.reportForm = 'Lios/CraneInvoice'
      // }

      if (this.input === 0) {
        this.reportForm = 'Lios/CraneInvoice';
      } else {
        this.reportForm = 'Lios/craneFatura'; // this.reportForm = this.input
      }
    } else if (this.var1 === 'crane') {
      this.reportForm = 'Lios/CraneInquiry';
    } else if (this.var1 === 'payment/manual') {
      this.reportForm = 'Lios/PaymentPre';
      this.fullUrl =
        'https://api.lios3.xyz/api/v1/' + this.var1 + '/' + this.var2;
      this.param.Url = this.fullUrl;
    } else if (this.var1 === 'collect') {
      this.reportForm = 'Lios/CollectReport';
      this.fullUrl = this.baseUrl + this.var1 + this.var2;
      this.param.Url = this.fullUrl;
    } else if (this.var1 === 'bank') {
      this.reportForm = 'Lios/BankReport';
      this.fullUrl = this.baseUrl + this.var1 + this.var2;
      this.param.Url = this.fullUrl;
    } else if (this.var2[0] === 'm' && this.var2[1] === 's') {
      this.reportForm = `LiosRegistry/${this.var2}`;
    }

    this.param;
    this.reportForm;

    if (this.isAlternative == 'true') {
      this.param.Url = this.param.Url + '?isAlternative=true';
    }

    // this.param.Token = localStorage.getItem("token");
    this.param.Token = 'Bearer ' + localStorage.getItem('token');
    this.token = this.param.Token;

    this.load = true;
  }

  ngAfterViewInit(): void {
    // Localization demo.
    const language = navigator.language;
    let resources = StringResources.english; // Default.

    if (language === 'ja-JP') {
      resources = StringResources.japanese;
    }

    this.viewer.viewerObject.stringResources = Object.assign(
      this.viewer.viewerObject.stringResources,
      resources
    );
  }

  title = 'Report Viewer';
  viewerContainerStyle = {
    position: 'relative',
    height: '1100px',
    // width:'900px',
    // left: '5px',
    // right: '5px',
    // top: '40px',
    // bottom: '5px',
    overflow: 'hidden',
    clear: 'both',
    ['font-family']: 'ms sans serif',
  };

  ready() {
    console.log('ready');
  }
  viewerToolTipOpening(e: any, args: any) {
    console.log('viewerToolTipOpening ' + args.toolTip.text);
  }
}
