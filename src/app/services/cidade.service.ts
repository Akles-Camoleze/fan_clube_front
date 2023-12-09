import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PATH_API} from "../../consts";
import {Cidade} from "../entities/Cidade";

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) {
  }

  public register(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(`${PATH_API}/city/register`, cidade);
  }
}
