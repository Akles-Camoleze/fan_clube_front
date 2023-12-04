import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PATH_API} from "../../consts";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${PATH_API}/user/login`, {
      emailUsuario: email,
      senhaUsuario: password
    });
  }

}
