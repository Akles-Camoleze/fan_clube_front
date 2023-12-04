import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PATH_API} from "../../consts";
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${PATH_API}/user/login`, usuario);
  }

  register(usuario: Usuario): Observable<any> {
    return this.http.post(`${PATH_API}/user/register`, usuario);
  }

}
