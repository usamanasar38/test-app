import { User, UserApi } from './../../models/user.type';
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

  public user: User;
  public saveButtonClicked = new Subject<UserApi>();

  form: FormGroup;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required)
    });

    this.email.patchValue(this.user.email);
    this.firstName.patchValue(this.user.firstName);
    this.lastName.patchValue(this.user.lastName);
    this.avatar.patchValue(this.user.avatar);
  }

  editRow() {
    this.saveButtonClicked.next({
      id: this.user.id,
      ...this.form.getRawValue()
    });

    this.user = null;
    this.modalRef.hide();
  }

  get firstName() { return this.form.get('first_name'); }
  get lastName() { return this.form.get('last_name'); }
  get email() { return this.form.get('email'); }
  get avatar() { return this.form.get('avatar'); }
}

