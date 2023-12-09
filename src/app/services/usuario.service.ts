import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PATH_API} from "../../consts";
import {Usuario} from "../entities/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${PATH_API}/user/login`, usuario);
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${PATH_API}/user/register`, usuario);
  }

}
