import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Report :any;
  active_ordes = 0;
  active_messengers = 0;
  active_processors = 0;
  // 
  porcentaje_ordes = 0;
  porcentaje_messengers = 0;
  porcentaje_processors = 0;
  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.GetData();
  }


  GetData(){
    this.http.get("admin/dashboard").subscribe(
      (res) =>{
          console.log(res);
          this.Report = res.data;
       
          this.DataCard();
      },
      (error) =>{

      }
    );
  }

  DataCard(){
      this.active_ordes = this.Report.orders.active;
      this.active_messengers = this.Report.messengers.availables;
      this.active_processors = this.Report.Processors.availables;

    // 
    this.porcentaje_messengers = (100 * this.active_messengers)/this.Report.messengers.total ;
    this.porcentaje_ordes = (100* this.active_ordes)/this.Report.orders.total;
    this.porcentaje_processors = (100* this.active_processors)/this.Report.Processors.total;


  }

}
