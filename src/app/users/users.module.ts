import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { IconsModule, TableModule, ButtonsModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ButtonsModule,
    IconsModule,
    TableModule
  ]
})
export class UsersModule { }
