import { Observable } from 'rxjs';
import { UserAddEditComponent } from './../../shared/user-add-edit/user-add-edit.component';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  pageChanged(pageNumber: number): void {
    this.loadData(pageNumber);
  }

  editRow(userToRemove: any) {
    const userIndex = this.data.data.findIndex((user) => userToRemove === user);
    const modalOptions = {
      data: {
        user: userToRemove
      }
    };

    this.modalRef = this.modalService.show(UserAddEditComponent, modalOptions);
    (this.modalRef.content.saveButtonClicked as Observable<UserApi>).pipe(
      switchMap(user => this.usersService.updateEmployee(user.id, user))
    ).subscribe((user: User) => {
      this.data.data[userIndex] = user;
      this.mdbTable.setDataSource(this.data.data);
    });
  }

  removeRow(userToRemove: User) {
    const userIndex = this.data.data.findIndex((user) => userToRemove === user);
    this.usersService.deleteEmployee(this.data.data[userIndex].id).subscribe(() => {
      this.mdbTable.removeRow(userIndex);
    });
  }

  private loadData(pageNumber = 0): void {
    this.usersService.getEmployees(pageNumber).subscribe(res => {
      this.data = res;
      this.mdbTable.setDataSource(this.data.data);
    });
  }
}
