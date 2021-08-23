import { HttpserviceService } from 'src/app/shared/service/httpservice.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jspdf, {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  Item : any ;
  StatusFilter = false;
  p: number = 1;
  Filter = {
    star_date : '',
    end_date : '',
    status : '-1',
    type: '0' 
    
  }
  paginator = {
    currentPage : 0,
    lastPage : 0,
    perPage : 0, // Registros por página
    total : 0, // Total de registros
    id: 'custom',
  }
  filterapi_stardate = '';
  filterapi_enddate = '';
  filterapi_type = '';
  filterapi_status = '';
  pagesapi = '&page=1';
  
  constructor(private http:HttpserviceService) { 
    moment.locale('es');   
  }

  ngOnInit(): void {

    this.GetManagers();
  }

  GetTypeManager(status:number){
    let name = "";
   
      switch (status) {
        case 1:
            name = "Mensajero socio";
          break;
          case 2: 
            name = "Tramitador socio";
          break;
          case 3: 
            name = "Abogado socio";
        break;
         
      }

      return name;
  }

  Getnamestatus(status:number){
    let name = "";
   
      switch (status) {
        case 0:
            name = "Inactivo";
          break;
          case 1: 
            name = "Activo";
          break;
         
      }

      return name;
  }

  GetManagers(){
    this.http.get(
      "manager-available-histories?includes[]=manager.user&order_by=manager_id&order_direction=ASC"+
      this.pagesapi+
      this.filterapi_stardate+
      this.filterapi_enddate+
      this.filterapi_type+
      this.filterapi_status 
    ).subscribe(
      (res)=>{
      
        this.Item = res.data;
        this.paginator = res.meta.page;
        // console.log( res);
      },
      error => {
        console.log(error);
      }
    );
  }

  generatePDF() {
     
        var data = document.getElementById('contentToConvert') as HTMLCanvasElement;

        html2canvas(data).then(canvas => {
          var imgWidth = 208;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png')
          let pdf = new jspdf('p', 'mm', 'a4');
          pdf.addFont('Arial', 'Arial', 'normal');
          pdf.setFont('Arial');
          pdf.text("Listado de gestores", 5, 10);
          var position = 15;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          pdf.save('dowload.pdf');
        });
  }


  GetDataUser(user:any,type:string){
    if(type === 'name'){
      return user.full_name+" "+user.last_name;
    }else{
      return user.profile_image;
    }

  }

  GetDateUser(date:any){
    return moment(date).format("DD MMM YYYY").replace('.', ''); 
  }


  ShowFilter(){
    this.StatusFilter = !this.StatusFilter;
  }

  ApplyFilter(){
     
     
      if(this.Filter.star_date.length>=0 && this.Filter.star_date != ""){
        this.filterapi_stardate = "&start_date="+this.Filter.star_date;
      }else{
        this.filterapi_stardate = "";
      }

      if(this.Filter.end_date.length>=0 && this.Filter.end_date != ""){
        this.filterapi_enddate = "&end_date="+this.Filter.end_date;
      }else{
        this.filterapi_enddate = "";
      }

      if(this.Filter.type.length>=0 && this.Filter.type != "" && this.Filter.type != "0"){
        this.filterapi_type = "&manager_type_id="+this.Filter.type;
      }else{
        this.filterapi_type = "";
      }

      if(this.Filter.status.length>=0 && this.Filter.status != "" && this.Filter.status != "-1"){
        this.filterapi_status = "&available="+this.Filter.status;
      }else{
        this.filterapi_status = "";
      }
 
       this.GetManagers();
       this.ShowFilter();
  }

  CleanFilter(){
    this.Filter = {
      star_date : '',
      end_date : '',
      status : '-1',
      type: '0' 
    }
    this.ApplyFilter();
  }

  pageChange( page: number ): void {
    // console.log(page);
    this.pagesapi = '&page='+page;
    this.paginator.currentPage = page;
		this.GetManagers();
	}

}
