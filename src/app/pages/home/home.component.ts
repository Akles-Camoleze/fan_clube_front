import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Subscription, finalize} from "rxjs";
import {Evento} from "../../entities/Evento";
import {InscricaoService} from "../../services/inscricao.service";
import {Inscricao} from "../../entities/Inscricao";
import {Usuario} from "../../entities/Usuario";
import {StateService} from "../../services/state.service";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventos: Evento[] = [];
  eventos$?: Subscription;
  inscricoes: Inscricao[] = [];
  registerEvento: boolean = false;
  destroy$?: Subscription;
  usuarioLogged!: Usuario;

  constructor(
    private eventoService: EventoService,
    private inscricaoService: InscricaoService,
    private stateService: StateService,
    private adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this.usuarioLogged = this.stateService.getItem<Usuario>('user')!;
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
    this.destroy$ = this.inscricaoService.findAllByUsuario(this.usuarioLogged.id).pipe(
      finalize((): void => this.destroy$?.unsubscribe())
    ).subscribe((response: Inscricao[]): void => {
      this.inscricoes = response;
      console.log(this.inscricoes);
    });
  }

  showRegister(value: boolean = true): void {
    this.registerEvento = value;
  }

  createEvento(evento: Evento): void {
    this.destroy$ = this.eventoService.register(evento)
      .pipe(finalize((): void => this.destroy$?.unsubscribe()))
      .subscribe((response: Evento): void => {
        this.eventos.push(response);
      });
  }

  subscribe(evento: Evento): void {
    const inscricao: Inscricao = new Inscricao();
    inscricao.evento = evento;
    inscricao.usuario = this.usuarioLogged;
    this.destroy$ = this.inscricaoService.register(inscricao)
      .pipe(finalize((): void => this.destroy$?.unsubscribe()))
      .subscribe((response: Inscricao): void => {
        this.inscricoes.push(response);
      })
  }

  unsubscribe(evento: Evento): void {
    let i: number;
    const inscricao: Inscricao = this.inscricoes.find((ins: Inscricao, index: number): boolean => {
      if (ins.evento.id === evento.id) {
        i = index;
        return true;
      }
      return false;
    })!;

    this.destroy$ = this.inscricaoService.delete(inscricao.id)
      .pipe(finalize((): void => this.destroy$?.unsubscribe()))
      .subscribe((): void => {
        this.inscricoes.splice(i, 1);
      })
  }

  verifySubscription(evento: Evento): boolean {
    return this.inscricoes.find((inscricao: Inscricao): boolean => inscricao.evento.id === evento.id) != undefined;
  }

  isAdmin(): boolean {
    return this.adminService.isAdmin();
  }
}
