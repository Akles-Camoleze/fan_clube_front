import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pessoa} from "../models/Pessoa";
import {PATH_API} from "../../consts";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) {
  }

  public register(pessoa: Pessoa): Observable<any> {
    return this.http.post(`${PATH_API}/person/register`, pessoa);
  }
}
