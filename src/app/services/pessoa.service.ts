import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pessoa} from "../entities/Pessoa";
import {PATH_API} from "../../consts";
import {PessoaSubscriptionModel} from "../pages/panel-adm/person-report/PessoaSubscriptionModel";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) {
  }

  public register(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${PATH_API}/person/register`, pessoa);
  }

  public getPessoaReport(): Observable<PessoaSubscriptionModel[]> {
    return this.http.get<PessoaSubscriptionModel[]>(`${PATH_API}/person/person-report`);
  }

}
