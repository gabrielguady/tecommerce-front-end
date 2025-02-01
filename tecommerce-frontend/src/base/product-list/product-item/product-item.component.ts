import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product';
import {BaseService} from '../../../shared/service/base.service';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {response} from 'express';
import {BaseComponent} from '../../base.component';
import {AutofocusDirective} from '../../../shared/directives/auto-focus.directive';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    AutofocusDirective
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent extends BaseComponent<Product> implements OnInit {
  public formGroup: FormGroup;
  public object: Product = new Product();


  constructor(private http: HttpClient) {
    super(http,URLS.PRODUCT)
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      description : new FormControl('', [Validators.required]),
      quantity : new FormControl('', [Validators.required])
    })
  }

  public saveOrUpdate(): void {
    if (this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(key => {
        const value = this.formGroup.getRawValue()[key];
        if (value !== null && value !== undefined) {
          this.object[key] = value;
        }
      });
      this.service.save(this.object).subscribe((response: Product ) => {
        this.goToPage('product')
      })
    }

  }

}
