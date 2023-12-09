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

  public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${PATH_API}/user/login`, usuario);
  }

  public register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${PATH_API}/user/register`, usuario);
  }

  public getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${PATH_API}/user/all`);
  }

  public update(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return this.http.put<Usuario>(`${PATH_API}/user/update`, usuario);
  }

}
