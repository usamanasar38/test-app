import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'finlex-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  usersSearch: FormControl;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersSearch = new FormControl();
  }

  search(): void {
    this.usersService.getUsers(1, this.usersSearch.value);
  }

}
