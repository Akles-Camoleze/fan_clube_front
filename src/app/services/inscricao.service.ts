import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Inscricao} from "../entities/Inscricao";
import {Observable} from "rxjs";
import {PATH_API} from "../../consts";

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  constructor(private http: HttpClient) {
  }

  public register(inscricao: Inscricao): Observable<Inscricao> {
    return this.http.post<Inscricao>(`${PATH_API}/subscription/register`, inscricao);
  }

  public findAllByUsuario(idUsuario: number): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${PATH_API}/subscription/all/${idUsuario}`);
  }
}
