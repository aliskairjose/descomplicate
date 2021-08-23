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

  users(option:any) : Observable<any> {
    return this.httpService.get('users-crud?roles[]=admin&roles[]=finance&roles[]=office&roles[]=approves'+option);
  } 
}
