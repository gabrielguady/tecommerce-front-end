import {Component, OnInit} from '@angular/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {Sale} from '../../shared/models/sale';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatSuffix,
    MatTable,
    ReactiveFormsModule,
    FormsModule,
    MatHeaderCellDef,
    MatFabButton
  ],
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.css'
})
export class SaleListComponent implements OnInit {
  public dataSource: Sale[] = [];
  public displayedColumns = ['id', 'id_product', 'nrf', 'actions'];
  public searchProduct: string = '' ;
  public searchNrf: string =  '';


  private router: Router = new Router();

  private service: BaseService<Sale>

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {
    this.service =  new BaseService<Sale>(http,URLS.SALE)
  }
  ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('id_product', this.searchProduct);
    this.service.addParameter('nrf', this.searchNrf);
    this.service.getAll().subscribe({
      next: (data: Sale[]) => {
        this.dataSource = data;
        console.log('Sale loaded: ', data);
      },
      error: (error) => {
        console.error('error loading Sale: ');
      }
    });
  }
  public deleteObject(id:number): void {
    this.service.delete(id).subscribe({
      next: (_) => {
        this.search()
      },
      error: (error) => {
        console.error('error delete Employee: ');
      }
    })
  }
  public goToPage(route: string): void {
    const extras: NavigationExtras= {queryParamsHandling: "merge"}
    this.router.navigate([route], extras).then();
  }
}
