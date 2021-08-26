import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-tramitadores-partners',
  templateUrl: './tramitadores-partners.component.html',
  styleUrls: ['./tramitadores-partners.component.scss']
})
export class TramitadoresPartnersComponent implements OnInit {
  Item = [];
  paginator = {
    currentPage : 0,
    lastPage : 0,
    perPage : 0, // Registros por página
    total : 0, // Total de registros
    id: 'custom',
  }
  pagesapi = '?page=1';
  constructor(private htpp:HttpserviceService) { }

  ngOnInit(): void {
    this.GetItemTramitadores();
  }

  pageChange( page: number ): void {
    // console.log(page);
    this.pagesapi = '&page='+page;
    this.paginator.currentPage = page;
		this.GetItemTramitadores();
	}


  GetItemTramitadores(){
    this.htpp.get("users/admin/manager/processors"+this.pagesapi).subscribe(
      (res)=>{
        console.log(res);
        this.Item = res.data;
        this.paginator =  res.meta.page;
      },
      error => {
        console.log(error);
      }
    );
  }

  ChangeItem(newItem: string) {
    if(newItem == "RefreshList"){
      this.GetItemTramitadores();
    }
  }

}
