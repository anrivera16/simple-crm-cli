import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerMockService extends CustomerService {
  customers: Customer[] = []
  constructor(http: HttpClient) {
    super(http);
    console.warn("This is the mock provider")
    const localCustomers = localStorage.getItem('customers');
    if (localCustomers) {
      this.customers = JSON.parse(localCustomers);
    } else {
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
          id: 2,
          firstName: 'colburn',
          lastName: 'sanders',
          phoneNumber: '6185410618',
          emailAddress: 'colburn.sanders@redcedartg.com',
          optInNewsletter: false,
          type: 'email',
          preferredContactMethod: 'email',
          lastContactDate: '053099',
          status: 'active',
        }]
    }
    }
   override search(term: string): Observable<Customer[]> {
    //let result = this.customers.filter(x => x.firstName == term || x.lastName == term || x.phoneNumber == term || x.emailAddress == term || x.status == term )
    let result = this.customers;
    return of(result)
  }
  override insert(customer: Customer): Observable<Customer> {
    this.customers.push(customer)
    localStorage.setItem('customers', JSON.stringify(this.customers));
    return of(customer);
  }
  override update(customer: Customer): Observable<Customer> {
    this.customers.map(x => {
      if(x.id == customer.id){
        x.firstName = customer.firstName;
        x.lastName = customer.lastName;
      }
    })
    return of(customer);
}
override get(id: number): Observable<Customer> {
  // Note: if a string "1" was passed into here, this would not match customer with id 1.
  // With === the type on both sides must be the same.  "1" is not equal to 1.
  let item = this.customers.find(x => x.id == id) as Customer;
  return of(item);
}



}
