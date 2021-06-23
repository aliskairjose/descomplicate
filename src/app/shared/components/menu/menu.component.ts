
import { Component, ElementRef, OnDestroy, OnInit, HostListener, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() item = ''; // decorate the property with @Input()
  name_user = "";
  display_name ="";
  display_rol = "";
  constructor(
    private Auth:AuthService,
    private storage: StorageService
  ) {
  
  }
  ngOnInit() {
    // console.log(this.item);
    // let  item = document.getElementsByTagName("li");
    // // console.log(item);
    // for (let i = 0; i < item.length; i++) {
    //   item[i].addEventListener("click", function() {
    //     // this.classList.toggle("active");
    //     console.log(this);
    //   });
    // }
    this.GetDataUserSession();
  }

  GetDataUserSession(){
      let data = this.storage.getItem("user");
      this.name_user = data.name;
      this.display_name =  this.name_user;
      switch (data.role) {
        case "admin":
          this.display_rol = "Administador";
        break;
     
      }
  }

  ngDoCheck() {
    this.VerifyActiveSidebar();
  }

  VerifyActiveSidebar(){
    if(this.item== "active"){
      var palabras = this.name_user,
      array = palabras.split(" "),
      total = array.length,
      resultado = "";
   
      for (var i = 0; i < total; resultado += array[i][0], i++);
      this.display_name = resultado;
    }else{
      this.display_name = this.name_user;
    }
  }

  Logout(){
    this.Auth.logout();
  }


}
