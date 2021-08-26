import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/shared/service/httpservice.service';

@Component({
  selector: 'app-messengers-partners',
  templateUrl: './messengers-partners.component.html',
  styleUrls: ['./messengers-partners.component.scss']
})
export class MessengersPartnersComponent implements OnInit {
  Item = [  ];
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
    this.GetItemMessengers();
  }

  pageChange( page: number ): void {
    // console.log(page);
    this.pagesapi = '&page='+page;
    this.paginator.currentPage = page;
		this.GetItemMessengers();
	}

  GetItemMessengers(){
    this.htpp.get("users/admin/manager/messengers"+this.pagesapi).subscribe(
      (res)=>{
        // console.log(res.data);
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
      this.GetItemMessengers();
    }
  }

}
