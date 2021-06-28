import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  Item = [
    {src:"../../../../assets/user-img/user.png",name:"Mark Torres",rol:"Administrador"},
    {src:"../../../../assets/user-img/user.png",name:"Rob Morales",rol:"Facturación"},
    {src:"../../../../assets/user-img/user.png",name:"Luisa Flores",rol:"Transmitador"},
    {src:"../../../../assets/user-img/user.png",name:"Flor Ramirez",rol:"Transmitador"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
