import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetdataService } from '../../shared/service/getdata.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  submitted: boolean = false;
  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void; }; };
  UserForm: FormGroup;
  btn : boolean = false;
  rolesList: any = [];

  Item = [
    {src:"../../../../assets/user-img/user.png",name:"Mark Torres",rol:"Administrador"},
    {src:"../../../../assets/user-img/user.png",name:"Rob Morales",rol:"Facturación"},
    {src:"../../../../assets/user-img/user.png",name:"Luisa Flores",rol:"Transmitador"},
    {src:"../../../../assets/user-img/user.png",name:"Flor Ramirez",rol:"Transmitador"}
  ];


  constructor(
    public formBuilder: FormBuilder,
    private GetdataService: GetdataService,
  ) { 
    this.UserForm = this.formBuilder.group({
      name: ['',[Validators.required,],],
      mail: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),],],
      pass: new FormControl('',[Validators.required,Validators.minLength( 8 )]),
      rol: ['',[Validators.required,],],
     
    });
    
  }

  get f() { return this.UserForm.controls; }

  ngOnInit(): void {
    this.getInstitutions();
  }

  Clean(){
     
  }

  regUser() {
    this.submitted = true;
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

  onSubmit(){
    this.submitted = true;
   

   }

   getInstitutions() {
    this.GetdataService.roles().subscribe(
      (response) => {
        this.rolesList = response.data;
        console.log(this.rolesList);
      },
      (error) => { }
    );
  }

}
