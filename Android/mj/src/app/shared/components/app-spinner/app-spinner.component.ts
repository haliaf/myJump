import { Component, OnInit, NgModule } from '@angular/core';
import { DxLoadIndicatorModule } from 'devextreme-angular';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.scss']
})
export class AppSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [
    DxLoadIndicatorModule
  ],
  declarations: [ AppSpinnerComponent ],
  exports: [ AppSpinnerComponent ]
})
export class AppSpinnerModule { }
