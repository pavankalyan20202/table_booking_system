import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  

  env = environment;

  constructor(private http: HttpClient) {
  }

  getAllTables(): Observable<any[]> {
    return this.http.get<any[]>(this.env.BASE_URL + "tables");
  }

  getAvailableTables(): Observable<any[]> {
    return this.http.get<any[]>(this.env.BASE_URL + "tables/available");
  }

  createTable(table: any): Observable<any> {
    return this.http.post<any>(this.env.BASE_URL + 'tables', table);
  }

  updateTable(id: string, table:any): Observable<any> {
    return this.http.put<any>(this.env.BASE_URL + 'tables/' + id, table);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.env.BASE_URL + 'tables/' + id);
  }

}
