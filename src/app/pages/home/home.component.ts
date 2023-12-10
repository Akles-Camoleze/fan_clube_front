import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Subscription, finalize} from "rxjs";
import {Evento} from "../../entities/Evento";
import {InscricaoService} from "../../services/inscricao.service";
import {Inscricao} from "../../entities/Inscricao";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  eventos$?: Subscription;
  inscricoes: Inscricao[] = [];
  inscricoes$?: Subscription;
  registerEvento: boolean = false;
  registerEvento$?: Subscription;

  constructor(
    private eventoService: EventoService,
    private inscricaoService: InscricaoService
  ) {
  }

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(): void {
    this.eventos$ = this.eventoService.getAll().pipe(
      finalize((): void => this.eventos$?.unsubscribe())
    ).subscribe((eventos: Evento[]): void => {
      this.eventos = eventos;
      this.getUsuarioIncricoes();
    });
  }

  getUsuarioIncricoes(): void {
    this.inscricoes$ = this.inscricaoService.findAllByUsuario(1).pipe(
      finalize((): void => this.inscricoes$?.unsubscribe())
    ).subscribe((response: Inscricao[]): void => {
      this.inscricoes = response;
      console.log(this.inscricoes);
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
