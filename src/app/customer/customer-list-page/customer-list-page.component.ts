import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerCreateDialogComponent } from '../customer-create-dialog/customer-create-dialog.component';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss']
})
export class CustomerListPageComponent implements OnInit {
  customers: Customer[] = [];
  dataSource!: MatTableDataSource<Customer>; // The ! tells Angular you know it may be used before it is set.  Try it without to see the error
  displayColumns = ['name', 'phoneNumber', 'emailAddress', 'status', 'actions'];
  constructor(
    custSvc: CustomerService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    custSvc.search('').subscribe({
      next: (list) => {
        this.customers = list
      }
    });

    this.dataSource = new MatTableDataSource(this.customers);
  }
  ngOnInit(): void {

  }
  viewDetail(cust: Customer){
    this.router.navigate(['/customer', cust.id])
  }
  public addCustomer(){
    const dialogRef = this.dialog.open(CustomerCreateDialogComponent, {
      width: '250px',
      data: undefined,

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('This dialog was closed',result);
    })
  }

}
