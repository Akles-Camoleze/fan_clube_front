import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Subscription, finalize} from "rxjs";
import {Evento} from "../../entities/Evento";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  eventos$?: Subscription;
  registerEvento: boolean = false;
  registerEvento$?: Subscription;

  constructor(private eventoService: EventoService) {
  }

  ngOnInit(): void {
    this.eventos$ = this.eventoService.getAll().pipe(
      finalize((): void => this.eventos$?.unsubscribe())
    ).subscribe((eventos: Evento[]): void => {
      this.eventos = eventos;
      console.log(this.eventos);
    });
  }

  showRegister(value: boolean = true): void {
    this.registerEvento = value;
  }

  createEvento(evento: Evento): void {
    this.registerEvento$ = this.eventoService.register(evento)
      .pipe(finalize((): void => this.registerEvento$?.unsubscribe()))
      .subscribe((response: Evento): void => {
        this.eventos.push(response);
      });
  }
}
