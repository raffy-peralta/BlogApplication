import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  baseUrl: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'blogs';
  baseUrlDrafts: any = JSON.parse(localStorage.getItem('baseUrl')).baseUrl+'drafts';
  constructor(private http: HttpClient) { }
  getJson(): Observable<any>{

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.baseUrl, {headers});
  }

  save(data){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, data, {headers});
  }

  delete(i: number){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.delete(this.baseUrl+'/'+i, {headers});
  }

  saveDrafts(data){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrlDrafts, data, {headers});
  }

  getDrafts(): Observable<any>{

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.baseUrlDrafts, {headers});
  }
}
