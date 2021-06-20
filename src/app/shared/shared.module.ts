import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule, ButtonsModule, InputUtilitiesModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [UserAddEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // To user reactive forms
    InputsModule,
    ButtonsModule,
    InputUtilitiesModule
  ],
  exports: [UserAddEditComponent]
})
export class SharedModule { }
