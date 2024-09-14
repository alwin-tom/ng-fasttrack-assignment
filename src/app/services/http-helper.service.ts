import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  baseURL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  doDelete(url: string): Observable<any> {
    return this.http.delete(this.baseURL + url);
  }

  doGet(url: string): Observable<any> {
    return this.http.get(this.baseURL + url);
  }

  doPost(url: string, data: any): Observable<any> {
    return this.http.post(this.baseURL + url, data);
  }

  doPut(url: string, data: any, responseType?: any): Observable<any> {
    return this.http.put(this.baseURL + url, data);
  }
}
