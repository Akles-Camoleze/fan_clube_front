import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PATH_API} from "../../consts";
import {UsuarioModel} from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  login(user: UsuarioModel): Observable<any> {
    return this.http.post(`${PATH_API}/user/login`, user);
  }

}
