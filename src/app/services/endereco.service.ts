import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PATH_API} from "../../consts";
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../models/Endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  public register(endereco: Endereco): Observable<any> {
    return this.http.post(`${PATH_API}/address/register`, endereco);
  }
}
