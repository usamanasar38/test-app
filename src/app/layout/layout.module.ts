import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { FinlexFooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    NavComponent,
    FinlexFooterComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    WavesModule,
    ButtonsModule
  ],
  exports: [
    NavComponent,
    FinlexFooterComponent
  ]
})
export class LayoutModule { }
