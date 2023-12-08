import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PATH_API} from "../../consts";
import {Observable} from "rxjs";
import {Evento} from "../models/Evento";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${PATH_API}/event/all`);
  }
}
