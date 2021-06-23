import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  Item = [
    {
      code:"LC212312",doc_name:"Licencia de Conducir",institute:"INTT",src_messages:"../../../../assets/user-img/user.png",
      name_messages:"Mark Torres",src_tramitador:"../../../../assets/user-img/user.png",name_tramitador:"Luis Escalona",status:"0"}
      ,
    {
      code:"LC212312",doc_name:"Pago de solvencias municipales",institute:"INTT",src_messages:"../../../../assets/user-img/user.png",
      name_messages:"Rob Morales",src_tramitador:"../../../../assets/user-img/user.png",name_tramitador:"Luis Escalona",status:"1"}
      ,
    {
      code:"LC212312",doc_name:"Licencia",institute:"INTT",src_messages:"../../../../assets/user-img/user.png",
      name_messages:"Luisa Flores",src_tramitador:"../../../../assets/user-img/user.png",name_tramitador:"Luis Escalona",status:"0"
    },
    {
      code:"LC212312",doc_name:"Pago de solvencias municipales",institute:"INTT",src_messages:"../../../../assets/user-img/user.png",
      name_messages:"Flor Ramirez",src_tramitador:"../../../../assets/user-img/user.png",name_tramitador:"Luis Escalona",status:"2"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }


  Getnamestatus(status:string){
    let name = "";
   
      switch (status) {
        case "0":
            name = "Pendiente";
          break;
          case "1": 
            name = "Procesado";
          break;
          case "2":
              name = "Entregado";
          break;
      }

      return name;
  }

}
