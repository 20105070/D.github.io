/*http_service.ts - Daniel Syrén (20105070)*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { University } from './models/university';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /*constructor(private httpClient: HttpClient) injects httpClient.*/
  constructor(private httpClient: HttpClient) { }

  /*deleteUniversity() sends delete request to the C# back-end.*/
  deleteUniversity(name: string): Observable<any> {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', "*");
    return this.httpClient.delete(`https://localhost:7013/University/DeleteUniversity/${name}`, { headers: headers });
  }

  /*getUniversities() sends get request to the C# back-end.*/
  getUniversities(): Observable<University[]> {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', "*");
    return this.httpClient.get<University[]>('https://localhost:7013/University/GetUniversities', { headers: headers });
  }

  /*postUniversity() sends post request to the C# back-end.*/
  postUniversity(university: University): Observable<any> {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', "*").set('Content-Type', 'application/json');
    return this.httpClient.post<University>('https://localhost:7013/University/PostUniversity/', university, { headers: headers });
  }

}