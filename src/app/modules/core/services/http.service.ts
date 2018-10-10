
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable()
export class HttpService {

  // baseUrl = 'assets/db/';
  baseUrl = environment.apiEndPoint;


  constructor(private http: HttpClient) {
  }

  get<T>(url: string): Observable<any> {
    return this.http.get<T>(`${this.baseUrl}${url}`)
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, payload: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<T>(`${this.baseUrl}/${url}`, payload, {
      headers: headers, withCredentials: true
    })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
