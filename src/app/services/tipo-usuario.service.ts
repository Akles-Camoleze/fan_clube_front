import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TipoUsuario} from "../entities/TipoUsuario";
import {PATH_API} from "../../consts";

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(`${PATH_API}/user-type/all`);
  }
}
