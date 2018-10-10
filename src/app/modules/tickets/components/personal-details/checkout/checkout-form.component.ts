import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CheckoutEventArgs } from '../checkout-event-args';
import { AbstractControl, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styles: []
})
export class CheckoutFormComponent implements OnInit {
  orderForm: FormGroup;
  @Output() completedPurchase = new EventEmitter<CheckoutEventArgs>();
  
  constructor(private formBuilder: FormBuilder) {
    this.orderForm = formBuilder.group({
      'fullName': ['', [Validators.required]],
      'email': ['', [Validators.required,
      Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'ccNumber': ['', [Validators.required, this.ccNumberValidator]]
    });
  }


  ngOnInit() {
  }

  ccNumberValidator(control: AbstractControl): { [s: string]: boolean } {
    if (control.value.length < 16) {
      // minimum 16 digits in a credit card number
      return { ccToShoprt: true };
    }
    return null;
  }

  completePurchase() {
    const eventargs = <CheckoutEventArgs>{};
    eventargs.fullName = this.orderForm.controls['fullName'].value;
    eventargs.email = this.orderForm.controls['email'].value;
    eventargs.ccNumber = this.orderForm.controls['ccNumber'].value;
    this.completedPurchase.emit(eventargs);
  }



}
