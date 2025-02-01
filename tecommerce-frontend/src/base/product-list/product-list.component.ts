import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {URLS} from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NavigationExtras, Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatCard,
    MatTableModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatFabButton,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public dataSource: Product[] = [];
  public displayedColumns = ['id', 'description', 'quantity', 'actions'];
  public searchValue: string = '';
  public searchQtd  : string =  '';

  private router: Router = new Router();

  private service: BaseService<Product>

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {
    this.service =  new BaseService<Product>(http,URLS.PRODUCT)
  }

  ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('description', this.searchValue);
    this.service.addParameter('quantity_gt', this.searchQtd);
    this.service.getAll().subscribe({
      next: (data: Product[]) => {
        this.dataSource = data;
        console.log('product loaded: ', data);
      },
      error: (error) => {
        console.error('error loading products: ');
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
