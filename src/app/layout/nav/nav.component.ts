import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'finlex-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // form control for search
  usersSearch: FormControl;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    // initialize form control
    this.usersSearch = new FormControl();
  }

  search(): void {
    if (this.usersSearch.invalid) {
      return;
    }

    /**
     * Get users. returned data is passed to usersList subject in service.
     * Subject will pass that data to subscription in users component
     */
    this.usersService.getUsers(1, this.usersSearch.value);
  }

}
