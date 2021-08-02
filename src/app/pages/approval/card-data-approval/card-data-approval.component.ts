import { HttpserviceService } from './../../../shared/service/httpservice.service';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-card-data-approval',
  templateUrl: './card-data-approval.component.html',
  styleUrls: ['./card-data-approval.component.scss']
})
export class CardDataApprovalComponent implements OnInit {
  @Input() data : any; // decorate the property with @Input()
  @Input() pages : any; // decorate the property with @Input()
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
  }

  Approval(id:string){
      let id_user = id;
      let name = "";
      switch (this.pages) {
        case "tramitadores":
          name = "Tramitadores";
        break;
        case "messengers":
          name = "Mensajeros";
        break;
       
      }
      this.http.put("admin/users/managers/"+id_user+"/approve").subscribe(
        (res)=>{
          // Swal.fire( '', "Aprobado "+name, 'success' );
          Swal.fire({
            title: '',
            text: "Aprobado "+name,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#304FFE'});
          this.newItemEvent.emit("RefreshList");
        },
        (error)=> {
          this.newItemEvent.emit("Error");
        }
      );
  }

 async Reject(id:string){
  let id_user = id;
    let name = "";
    switch (this.pages) {
      case "tramitadores":
        name = "Tramitadores";
      break;
      case "messengers":
        name = "Mensajeros";
      break;
     
    }

    const { value: motivo } = await Swal.fire({
      title: 'Rechazo de '+name,
      input: 'text',
      inputLabel: 'Indique el motivo del Rechazo',
      inputPlaceholder: '',
      showCancelButton: true
    })
    
 
    if(motivo != "" && motivo != undefined && motivo != null){
      this.http.put("admin/users/managers/"+id_user+"/reject",{reason:motivo}).subscribe(
        (res)=>{
          // Swal.fire( '', "Rechazado "+name, 'success' );
          Swal.fire({
            title: '',
            text: "Rechazado "+name,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#304FFE'});
          this.newItemEvent.emit("RefreshList");
        },
        (error)=> {
          this.newItemEvent.emit("Error");
        }
      );
    }
  
  }

 

}
