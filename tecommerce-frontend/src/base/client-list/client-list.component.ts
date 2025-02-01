import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Client} from '../../shared/models/client';
import {NavigationExtras, Router} from '@angular/router';
import {BaseService} from '../../shared/service/base.service';


@Component({
  selector: 'app-client-list',
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
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  public dataSource: Client[] = [];
  public displayedColumns = ['id', 'name', 'age', 'cpf', 'rg','actions'];
  public searchName: string = '';
  public searchAge  : string =  '';

  private router: Router = new Router();

  private service: BaseService<Client>

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {
    this.service =  new BaseService<Client>(http,URLS.CLIENT)
  }
  ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('name', this.searchName);
    this.service.addParameter('age_GT', this.searchAge);
    this.service.getAll().subscribe({
      next: (data: Client[]) => {
        this.dataSource = data;
        console.log('client loaded: ', data);
      },
      error: (error) => {
        console.error('error loading Employee: ');
      }
    });
  }

  public deleteObject(id:number): void {
    this.service.delete(id).subscribe({
      next: (_) => {
        this.search()
      },
      error: (error) => {
        console.error('error delete Client: ');
      }
    })
  }
  public goToPage(route: string): void {
    const extras: NavigationExtras= {queryParamsHandling: "merge"}
    this.router.navigate([route], extras).then();
  }
}
