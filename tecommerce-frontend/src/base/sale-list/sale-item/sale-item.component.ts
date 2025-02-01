import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Sale} from '../../../shared/models/sale';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {BaseComponent} from '../../base.component';
import {AutofocusDirective} from '../../../shared/directives/auto-focus.directive';


@Component({
  selector: 'app-sale-item',
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
    AutofocusDirective,
  ],
  templateUrl: './sale-item.component.html',
  styleUrl: './sale-item.component.css'
})
export class SaleItemComponent extends BaseComponent<Sale> implements OnInit {
  public formGroup: FormGroup;
  public object: Sale = new Sale();

  constructor(private http: HttpClient) {
    super(http,URLS.SALE)
  }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      id_product: new FormControl('', [Validators.required]), // certifique-se de que o nome do campo está correto
      id_client: new FormControl('', [Validators.required]),
      id_employee: new FormControl('', [Validators.required]),
      nrf: new FormControl('', [Validators.required])
    });
  }

  public saveOrUpdate(): void {
    if (this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(key => {
        const value = this.formGroup.getRawValue()[key];
        if (value !== null && value !== undefined) {
          this.object[key] = value;
        }
      });
      this.service.save(this.object).subscribe((response: Sale ) => {
        this.goToPage('sale')
      })
    }

  }

}
