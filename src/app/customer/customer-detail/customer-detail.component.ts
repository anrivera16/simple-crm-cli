import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerId: number;
  customer: Customer | undefined;
  detailForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private custSvc: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.detailForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      preferredContactMethod: ['email']
    });
    this.createForm();
    this.customerId = this.route.snapshot.params['id'];
    this.custSvc //injected
        .get(this.customerId)
        .subscribe(cust => {  // like listening to a JavaScript fetch call to return
           if (cust) {
             this.customer = cust;
             this.detailForm.patchValue(cust);
           }
        });
  }
  ngOnInit(): void {

  }
  public createForm(): void {
    this.detailForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      preferredContactMethod: ['email']
    });

  }
  public save() {
    if (!this.detailForm.valid) { return; }
    const customer = { ...this.customer, ...this.detailForm.value };
    this.custSvc.update(customer).subscribe({
       next: (result) => {
          // TODO: show a snackbar message
          this.snackBar.open('Customer saved', 'OK');
       },
       error: (err) => {
          // TODO:  show a snackbar message
          this.snackBar.open('Customer Error', 'Error');
       }
    });  //  <-- NEW
 }
}
