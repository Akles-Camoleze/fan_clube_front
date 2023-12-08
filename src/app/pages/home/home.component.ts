import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../services/evento.service";
import {Subscription, finalize} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  eventos: any[] = [];
  eventos$?: Subscription;

  constructor(private eventoService: EventoService) {
  }

  ngOnInit(): void {
    this.eventos$ = this.eventoService.getAll().pipe(
      finalize((): void => this.eventos$?.unsubscribe())
    ).subscribe((eventos: any[]): void => {
      this.eventos = eventos;
      console.log(this.eventos);
    });
  }


}
