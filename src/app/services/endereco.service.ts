import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PATH_API} from "../../consts";
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../entities/Endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  public register(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${PATH_API}/address/register`, endereco);
  }
}
