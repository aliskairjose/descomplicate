import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetdataService } from '../../shared/service/getdata.service';
import { AuthService } from '../../shared/service/auth.service';
import { UserService } from '../../shared/service/user.service';


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
  btn: boolean = false;
  rolesList: any = [];
  rolUser: any = [];
  dataRegister: any = [];
  userList: any = [];
  name: string | undefined;
  email: string | undefined;
  password: string = '';
  condUpdate: boolean = false; proceso: string | undefined;
  jsonUpdate: any; idUser: number | undefined;

  Item = [
    { src: "../../../../assets/user-img/user.png", name: "Mark Torres", rol: "Administrador" },
    { src: "../../../../assets/user-img/user.png", name: "Rob Morales", rol: "Facturación" },
    { src: "../../../../assets/user-img/user.png", name: "Luisa Flores", rol: "Transmitador" },
    { src: "../../../../assets/user-img/user.png", name: "Flor Ramirez", rol: "Transmitador" }
  ];


  constructor(
    public formBuilder: FormBuilder,
    private GetdataService: GetdataService,
    private AuthService: AuthService,
    private UserService: UserService
  ) {
    this.UserForm = this.formBuilder.group({
      name: ['', [Validators.required,],],
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),],],
      pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rol: ['', [Validators.required,],],

    });

  }

  get f() { return this.UserForm.controls; }

  ngOnInit(): void {
    this.roles();
    this.users();
  }

  Clean() {

  }

  regUser() {
    this.submitted = true;
    this.dataRegister = {
      "name": this.UserForm.value.name,
      "password": this.UserForm.value.pass,
      "password_confirmation": this.UserForm.value.pass,
      "email": this.UserForm.value.mail,
      "role_id": this.UserForm.value.rol
    }
    this.AuthService.register(this.dataRegister).subscribe(
      (response) => {
        this.alertSucces(1);
      },
      (error) => {

      }
    );
  }

  alertSucces(origen: number | undefined) {
    if (origen === 1) {
      this.proceso = 'registrado';
    } else {
      this.proceso = 'actualizado';
    }

    Swal.fire({
      icon: 'success',
      title: 'Muy bien !',
      text: 'Usuario ' + this.proceso + ' con éxito !',

    });
    this.closebutton.nativeElement.click();
    this.users();
  }

  onSubmit() {
    this.submitted = true;


  }

  roles() {
    this.GetdataService.roles().subscribe(
      (response) => {
        this.rolesList = response.data;
      },
      (error) => { }
    );
  }

  users() {
    this.GetdataService.users().subscribe(
      (response) => {
        this.userList = response.data;
      },
      (error) => { }
    );
  }

  editUser(data: any) {
    this.condUpdate = true;
    this.password = '';
    this.name = data.name;
    this.email = data.email;
    this.rolUser = data.roles[0].id;
    this.idUser = data.id;
  }

  updateUserEnd() {
    if (this.password === '' || this.password === null || this.password === undefined) {
      this.jsonUpdate = {
        "active": true,
        "role_id": this.rolUser,
        "name": this.name
      };
    } else {
      this.jsonUpdate = {
        "active": true,
        "role_id": this.rolUser,
        "password": this.password,
        "name": this.name
      };
    }

    this.UserService.updateAdmin(this.jsonUpdate, this.idUser).subscribe(
      async (response) => {
        this.alertSucces(2);
        this.condUpdate = false;
        this.name = '';
        this.email = '';
        this.rolUser = '';
        this.idUser = undefined;
      }
    );

  }

  cancelUpdate() {
    this.condUpdate = false;
    this.name = '';
    this.email = '';
    this.rolUser = '';
    this.idUser = undefined;
    this.closebutton.nativeElement.click();
  }
}
