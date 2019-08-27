import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  baseUrl = 'http://localhost:5000/users';
  constructor(private http: HttpClient) { }
  getJson(): Observable<any>{

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.baseUrl, {headers});
  }

}
