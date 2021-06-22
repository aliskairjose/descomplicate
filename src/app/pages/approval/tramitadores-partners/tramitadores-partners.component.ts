import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-tramitadores-partners',
  templateUrl: './tramitadores-partners.component.html',
  styleUrls: ['./tramitadores-partners.component.scss']
})
export class TramitadoresPartnersComponent implements OnInit {
  Item = []
  constructor(private htpp:HttpserviceService) { }

  ngOnInit(): void {
    this.GetItemTramitadores();
  }


  GetItemTramitadores(){
    this.htpp.get("users/admin/manager/processors?page=1").subscribe(
      (res)=>{
        // console.log(res.data);
        this.Item = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
