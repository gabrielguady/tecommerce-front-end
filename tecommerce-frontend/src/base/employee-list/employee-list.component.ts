import {Component, OnInit} from '@angular/core';
import {Employee} from '../../shared/models/employee';
import {URLS} from '../../shared/urls';
import {HttpClient, HttpParams} from '@angular/common/http';
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
  selector: 'app-employee-list',
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
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent implements OnInit {
  public dataSource: Employee[] = [];
  public displayedColumns = ['id', 'name', 'registraction', 'actions'];
  public searchName: string = '';
  public searchRegistraction: string =  '';

  private router: Router = new Router();

  private service: BaseService<Employee>

  private parameters: HttpParams = new HttpParams();

  constructor(private http: HttpClient) {
    this.service =  new BaseService<Employee>(http,URLS.EMPLOYEE)
  }
  ngOnInit(): void {
    this.search();
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('name', this.searchName);
    this.service.addParameter('registraction', this.searchRegistraction);
    this.service.getAll().subscribe({
      next: (data: Employee[]) => {
        this.dataSource = data;
        console.log('Employee loaded: ', data);
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
        console.error('error delete Employee: ');
      }
    })
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras= {queryParamsHandling: "merge"}
    this.router.navigate([route], extras).then();
  }


}

