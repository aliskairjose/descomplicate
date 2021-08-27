import { HttpserviceService } from './../../../shared/service/httpservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
  Item : any 
  Bank = new FormGroup({
    name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
  });
  submitted :boolean = false;
  id_bank : string = "";
  btn : boolean = false;
  page = "1";
  paginator = {
    currentPage : 0,
    lastPage : 0,
    perPage : 0, // Registros por página
    total : 0, // Total de registros
    id: 'custom',
  }
  
  constructor(private http: HttpserviceService) { }

  ngOnInit(): void {
    this.GetBanks();
  }

  get f() { return this.Bank.controls; }


  GetBanks(){
    this.http.get("banks?page="+this.page).subscribe(
      (res)=>{
        console.log(res);
          this.Item = res.data;
          this.paginator = res.meta.page;
      }
    );
  }

  pageChange( page: number ): void {
    // console.log(page);
    this.page = String(page);
    this.paginator.currentPage = page;
		this.GetBanks();
	}


  onSubmit(){
    this.submitted = true;
    if(this.Bank.valid){

          this.http.post( 'banks', this.Bank.value ).subscribe( response => {
            document.getElementById("close")?.click();
            Swal.fire( '', "Registro Exitoso", 'success' );
            this.Clean();
            this.GetBanks();
          },
          error =>{
            console.log(error);
          } );
    }
  }

  EditBank(){
    this.submitted = true;
    if(this.Bank.valid){

          this.http.put( 'banks/'+this.id_bank, this.Bank.value ).subscribe( response => {
            document.getElementById("close")?.click();
            Swal.fire( '', "Actualización Exitosa", 'success' );
            this.id_bank = "";
            this.btn = false;
            this.Clean();
            this.GetBanks();
          },
          error =>{
            console.log(error);
          } );
    }
  }

    ModalEdit(data:any){
      this.id_bank = data.id;
      this.btn = true;
      this.Bank.patchValue(data);
    }

    RemoveBank(id:string){
      Swal.fire({
        title: '',
        text: "¿Está seguro de eliminar este Banco?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#304FFE',
        // cancelButtonColor: '#ffff',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'button-cancel-sweet'
        }
      }).then((result) => {
        if (result.isConfirmed) {

          this.http.delete( 'banks/'+id ).subscribe( response => {
         
            Swal.fire({
              title: "Eliminacion Exitosa!",
              text: "",
              icon : "success",
              confirmButtonColor: '#304FFE'
            });

            this.GetBanks();
          },
          error =>{
            console.log(error);
          } );
      
        }
      })
    }

    Clean(){
      if(  this.btn ){
        this.btn = !this.btn;
      }
      this.submitted = false;
      this.Bank.patchValue({
        name : "",
        address :""
      });
    }



}
