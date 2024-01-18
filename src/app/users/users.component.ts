import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [
    {id: 1, name: 'Pat'},
    {id: 2, name: 'Chris'},
    {id: 3, name: 'Ken'},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
