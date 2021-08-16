import { HttpserviceService } from 'src/app/shared/service/httpservice.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jspdf, {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  Item : any;

  constructor(private http:HttpserviceService) { }

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
    this.http.get("users/admin/manager?page=1").subscribe(
      (res)=>{
      
        this.Item = res.data;
        // console.log( this.Item);
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

}
