import {Component, OnInit, ViewChild} from '@angular/core';
import {EventoReportModel} from "./EventoReportModel";
import {EventoService} from "../../../services/evento.service";
import {finalize, Subscription} from "rxjs";
import {Table} from "primeng/table";
import {InputNumber} from "primeng/inputnumber";

@Component({
  selector: 'app-event-report',
  templateUrl: './event-report.component.html',
  styleUrls: ['./event-report.component.scss']
})
export class EventReportComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  @ViewChild('input') input!: InputNumber;
  reports: EventoReportModel[] = [];
  reports$!: Subscription;
  loading: boolean = false;

  constructor(private eventoService: EventoService) {
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;
    this.reports$ = this.eventoService.getSubscriptionReport().pipe(
      finalize((): void => {
        this.reports$.unsubscribe()
        this.loading = false;
      })
    ).subscribe((response: EventoReportModel[]): void => {
      this.reports = response;
    });
  }

  clear(): void {
    this.table.clear();
    this.input.clear();
  }

}
