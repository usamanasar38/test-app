import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { User, UsersList } from 'src/app/models/user.type';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'finlex-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;

  data: UsersList<User[]>;
  headElements = ['id', 'email', 'firstName', 'lastName', 'avatar', 'command'];

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getEmployees().subscribe(res => {
      this.data = res;
      this.mdbTable.setDataSource(this.data.data);
      this.emitDataSourceChange();
    });
  }

  editRow(el: any) {
    const elementIndex = this.data.data.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    // this.modalRef = this.modalService.show(ModalEditComponent, modalOptions);
    // this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
    //   this.elements[elementIndex] = newElement;
    // });
    this.mdbTable.setDataSource(this.data.data);
  }

  removeRow(el: any) {
    const elementIndex = this.data.data.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.data.data);
  }

  private emitDataSourceChange() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.data.total);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }
}
