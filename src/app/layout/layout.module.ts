import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { AppFooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    NavComponent,
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavComponent,
    AppFooterComponent
  ]
})
export class LayoutModule { }
