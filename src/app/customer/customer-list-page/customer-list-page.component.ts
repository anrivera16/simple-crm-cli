import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../customer.model';
@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss']
})
export class CustomerListPageComponent implements OnInit {
  customers: Customer[] = [];
  dataSource!: MatTableDataSource<Customer>; // The ! tells Angular you know it may be used before it is set.  Try it without to see the error
  displayColumns = ['name', 'phoneNumber', 'emailAddress', 'status'];
  constructor() {
    this.customers = [
      {
        id: 1,
        firstName: 'andrew',
        lastName: 'rivera',
        phoneNumber: '6185410618',
        emailAddress: 'andrew.rivera@redcedartg.com',
        optInNewsletter: false,
        type: 'email',
        preferredContactMethod: 'email',
        lastContactDate: '053099',
        status: 'active',
      },
      {
        id: 1,
        firstName: 'colburn',
        lastName: 'sanders',
        phoneNumber: '6185410618',
        emailAddress: 'colburn.sanders@redcedartg.com',
        optInNewsletter: false,
        type: 'email',
        preferredContactMethod: 'email',
        lastContactDate: '053099',
        status: 'active',
      }
    ]
    this.dataSource = new MatTableDataSource(this.customers);
  }
  ngOnInit(): void {

  }

}
