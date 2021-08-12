import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(
    private httpService: HttpserviceService,
  ) { }

  roles() : Observable<any> {
    return this.httpService.get('roles?admin=true');
  } 

  users() : Observable<any> {
    return this.httpService.get('admin/users');
  } 
}
