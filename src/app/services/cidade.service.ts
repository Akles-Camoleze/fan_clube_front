import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PATH_API} from "../../consts";
import {Cidade} from "../models/Cidade";

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) {
  }

  public register(cidade: Cidade): Observable<any> {
    return this.http.post(`${PATH_API}/city/register`, cidade);
  }
}
