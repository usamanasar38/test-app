import { Observable } from 'rxjs';
import { UserAddEditComponent } from './../../shared/user-add-edit/user-add-edit.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { User, UserApi, UsersList } from 'src/app/models/user.type';
import { UsersService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'finlex-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild('row', { static: true }) row: ElementRef;

  data: UsersList<User[]>;
  headElements = ['id', 'email', 'firstName', 'lastName', 'command'];

  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.loadData();
    this.usersService.getUsers();
  }

  pageChanged(pageNumber: number): void {
    this.usersService.getUsers(pageNumber);
  }

  createUser(): void {
    this.modalRef = this.modalService.show(UserAddEditComponent);
    const subscription = (this.modalRef.content.saveButtonClicked as Observable<User>).subscribe((user: User) => {
      subscription.unsubscribe();
      this.data.data.push(user);
      this.mdbTable.setDataSource(this.data.data);
    });
  }

  editUser(userToRemove: User) {
    const userIndex = this.data.data.findIndex((user) => userToRemove === user);
    const modalOptions = {
      data: {
        user: userToRemove
      }
    };

    this.modalRef = this.modalService.show(UserAddEditComponent, modalOptions);
    const subscription = (this.modalRef.content.saveButtonClicked as Observable<User>).subscribe((user: User) => {
      subscription.unsubscribe();
      this.data.data[userIndex] = user;
      this.mdbTable.setDataSource(this.data.data);
    });
  }

  removeRow(userToRemove: User) {
    const userIndex = this.data.data.findIndex((user) => userToRemove === user);
    this.usersService.deleteUser(this.data.data[userIndex].id).subscribe(() => {
      this.mdbTable.removeRow(userIndex);
    });
  }

  private loadData(): void {
    this.usersService.usersListSubject.subscribe(res => {
      this.data = res;
      this.mdbTable.setDataSource(this.data.data);
    });
  }
}
