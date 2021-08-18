import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpserviceService,
  ) { }

  updateAdmin(params: any, id: number | undefined): Observable<any> {
    return this.httpService.put('users-crud/'+id, params);
  }
}
