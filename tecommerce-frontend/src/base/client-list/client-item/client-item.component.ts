import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Client} from '../../../shared/models/client';
import {HttpClient} from '@angular/common/http';
import {URLS} from '../../../shared/urls';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {BaseComponent} from '../../base.component';
import {AutofocusDirective} from '../../../shared/directives/auto-focus.directive';


@Component({
  selector: 'app-client-item',
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
  templateUrl: './client-item.component.html',
  styleUrl: './client-item.component.css'
})
export class ClientItemComponent extends BaseComponent<Client> implements OnInit {
  public formGroup: FormGroup;
  public object: Client = new Client();


  constructor(private http: HttpClient) {
    super(http,URLS.CLIENT)
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name : new FormControl('', [Validators.required]),
      age : new FormControl('', [Validators.required]),
      cpf : new FormControl('', [Validators.required]),
      rg : new FormControl('', [Validators.required])
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
      this.service.save(this.object).subscribe((response: Client ) => {
        this.goToPage('client')
      })
    }

  }

}
