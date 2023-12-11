import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PATH_API} from "../../consts";
import {Observable} from "rxjs";
import {Evento} from "../entities/Evento";
import {EventoReportModel} from "../pages/panel-adm/event-report/EventoReportModel";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${PATH_API}/event/all`);
  }

  public register(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${PATH_API}/event/register`, evento);
  }

  public delete(idEvento: number): Observable<any> {
    return this.http.delete(`${PATH_API}/event/${idEvento}`);
  }

  public getSubscriptionReport(year?: number): Observable<EventoReportModel[]> {
    let url: string = `${PATH_API}/event/subscription-report`;
    if (year) {
      url += `?year=${year}`;
    }
    return this.http.get<EventoReportModel[]>(url);
  }
}
