import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PATH_API} from "../../consts";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this.http.get(`${PATH_API}/event/all`);
  }
}
