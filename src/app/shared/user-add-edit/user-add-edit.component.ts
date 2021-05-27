import { User, UserApi } from './../../models/user.type';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'finlex-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  user: User;
  saveButtonClicked = new Subject<User>();
  saving = false;
  form: FormGroup;

  constructor(
    public modalRef: MDBModalRef,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required)
    });

    if (!this.user) {
      return;
    }

    // In edit mode, initialize form controls
    this.email.patchValue(this.user.email);
    this.firstName.patchValue(this.user.firstName);
    this.lastName.patchValue(this.user.lastName);
    this.avatar.patchValue(this.user.avatar);
  }

  // Form controls getters
  get firstName() { return this.form.get('first_name'); }
  get lastName() { return this.form.get('last_name'); }
  get email() { return this.form.get('email'); }
  get avatar() { return this.form.get('avatar'); }

  closeModel(): void {
    this.reset();
  }

  saveModel() {
    if (this.form.invalid) {
      return;
    }

    this.saving = true;

    if (this.user) {
      // update user if provided (edit mode)
      this.usersService.updateUser(this.user.id, this.form.getRawValue()).subscribe(res => {
        this.saveButtonClicked.next(res);
        this.reset();
      }, () => {
        this.saving = false;
      });
    } else {
      // create user if no user is provided
      this.usersService.createUser(this.form.getRawValue()).subscribe(res => {
        this.saveButtonClicked.next(res);
        this.reset();
      }, () => {
        this.saving = false;
      });
    }

  }

  // reset component and variables
  private reset(): void {
    this.user = null;
    this.modalRef.hide();
    this.form.reset();
    this.saving = false;
  }
}

