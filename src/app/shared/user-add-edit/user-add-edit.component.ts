import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'finlex-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  public editableRow: { id: string, first: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  form: FormGroup = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    handle: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.form.controls['id'].patchValue(this.editableRow.id);
    this.form.controls['first'].patchValue(this.editableRow.first);
    this.form.controls['last'].patchValue(this.editableRow.last);
    this.form.controls['handle'].patchValue(this.editableRow.handle);
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get first() { return this.form.get('first'); }

  get last() { return this.form.get('last'); }

  get handle() { return this.form.get('handle'); }
}

