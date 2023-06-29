import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService { 

  env = environment;

  constructor(private http: HttpClient) {

   }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.env.BASE_URL+"reservations").pipe(map(d=>this.modifyRowData(d)));
  }
  

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.env.BASE_URL + 'reservations', reservation);
  }

  updateReservation(id: string, reservation:any): Observable<any> {
    return this.http.put<any>(this.env.BASE_URL + 'reservations/' + id, reservation);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.env.BASE_URL + 'reservations/' + id);
  }

  modifyRowData(row: any[]): any {
    let tableBooked : any[] = [];
   const finalData = row.map((_el:any) => {
      let tables = _el['tables'];
      tables.forEach((_ell:any)=>{
        tableBooked.push(_ell['tableName'])
      });
      _el['tableBooked'] = tableBooked.toString();
      tableBooked = [];
      return _el;
    });
  return finalData;
  }
}
