import { Injectable } from '@angular/core';
import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {Http, ResponseContentType,RequestOptions,RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url="http://nitind03:8082/api/reportms/downloadChecklistResponseDocument/"
  constructor(private http: Http) { }

  downloadFile(responseId): Observable<any>{
   
		return this.http.get(this.url+responseId, {responseType: ResponseContentType.Blob});
  }
}
