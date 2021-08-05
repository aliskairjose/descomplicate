import { ViewChild, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void; }; };
  UserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    mail: new FormControl('',Validators.required),
    pass: new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required)
   
  });
  btn : boolean = false;

  Item = [
    {src:"../../../../assets/user-img/user.png",name:"Mark Torres",rol:"Administrador"},
    {src:"../../../../assets/user-img/user.png",name:"Rob Morales",rol:"Facturación"},
    {src:"../../../../assets/user-img/user.png",name:"Luisa Flores",rol:"Transmitador"},
    {src:"../../../../assets/user-img/user.png",name:"Flor Ramirez",rol:"Transmitador"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  Clean(){
     
  }

  regUser() {
    console.log(this.UserForm.value);
    this.alertSucces();
  }

  alertSucces() {
    Swal.fire({  
      icon: 'success',
      title: 'Muy bien !',
      text: 'Usuario registrado con éxito !',
      
    });
    this.closebutton.nativeElement.click();
  }

}
