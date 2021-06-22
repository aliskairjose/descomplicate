import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-messengers-partners',
  templateUrl: './messengers-partners.component.html',
  styleUrls: ['./messengers-partners.component.scss']
})
export class MessengersPartnersComponent implements OnInit {
  Item = [
   
  ]
  constructor(private htpp:HttpserviceService) { }

  ngOnInit(): void {
    this.GetItemMessengers();
  }

  GetItemMessengers(){
    this.htpp.get("users/admin/manager/messengers?page=1").subscribe(
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
