import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompensatoryExpenseType } from 'src/app/shared/interfaces/compenatory-expense-type';
import { CompensatoryExpenseTypeService } from 'src/app/shared/service/compensatory-expense-type.service';
import { Page } from '../../../shared/interfaces/response';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component( {
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: [ './expense.component.scss' ]
} )
export class ExpenseComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  paginator!: Page;

  page = 1;
  isEdit = false;
  customePattern = '^[a-zA-Z.áéíóúñ\\s]+$';

  expense!: CompensatoryExpenseType;
  expenses: CompensatoryExpenseType[] = [];

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private expenseService: CompensatoryExpenseTypeService
  ) {
    this.createForm();
    this.titleService.setTitle( 'Descomplicate - Gastos' );
  }

  get f() { return this.form.controls; }


  ngOnInit(): void {
    this.loadData();
  }

  onSubmit() {
    this.submitted = true;
    console.log( this.form.value )
    // if ( this.form.valid ) {
    //   ( this.isEdit ) ? this.updateExpense() : this.createExpense();
    // }
  }

  cancel() {
    this.expense = <CompensatoryExpenseType> {};
    this.isEdit &&= false;
  }

  pageChange( page: number ): void {
    this.page = page;
    this.paginator.currentPage = page;
    this.loadData();
  }

  add(): void {
    this.isEdit = false;
    this.createForm();
  }

  update( e: CompensatoryExpenseType ): void {
    this.isEdit = true;
    this.expense = { ...e };
    this.form.controls.name.patchValue( e.name );
    this.form.controls.amount.patchValue( e.amount );
  }

  delete( id: number ): void {
    this.deleteExpense( id );
  }

  private loadData(): void {
    this.expenseService.list( this.page ).subscribe( response => {
      if ( response.status === 'Success' ) {
        this.expenses = [ ...response.data ];
        this.paginator = response.meta?.page as Page;
      }
    } )
  }

  private createForm(): void {
    this.form = this.fb.group(
      {
        name: [ '', [ Validators.required, Validators.pattern( this.customePattern ) ] ],
        amount: [ 0, [ Validators.required, Validators.min( 1 ) ] ]
      }
    )
  }

  private createExpense(): void {
    this.expenseService.store( this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        document.getElementById( "close" )?.click();
        this.reloadAfter();
      }
    } );
  }

  private updateExpense(): void {
    this.expenseService.update( this.expense.id, this.form.value ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        this.reloadAfter();
      }
    } );
  }

  private deleteExpense( id: number ): void {
    this.expenseService.delete( id ).subscribe( response => {
      if ( response.status === 'Success' ) {
        Swal.fire( '', response.message, 'success' );
        this.reloadAfter();
      }
    } );
  }

  private reloadAfter(): void {
    document.getElementById( "close" )?.click();
    this.loadData();
  }
}
