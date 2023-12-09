import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../entities/Usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {finalize, Subscription} from "rxjs";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarios$?: Subscription;
  items: MenuItem[] = [];
  edit: boolean = false;
  selectedUser?: Usuario;
  selectedUserIndex: number = -1;

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarios$ = this.usuarioService.getAll()
      .pipe(finalize((): void => this.usuarios$?.unsubscribe()))
      .subscribe((response: Usuario[]): void => {
        this.usuarios = response;
      });
    this.items = [
      {
        icon: 'pi pi-trash',
        label: 'Excluir',
      },
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: (): void => this.showEdit()
      }
    ];
  }

  showEdit(value: boolean = true): void {
    this.edit = value;
  }

  updateUsuario(): void {
    this.showEdit(false);
    if (this.selectedUser && this.selectedUserIndex != -1) {
      this.usuarios$ = this.usuarioService.update(this.selectedUser)
        .pipe(finalize((): void => this.usuarios$?.unsubscribe()))
        .subscribe((response: Usuario): void => {
          delete this.selectedUser;
          this.usuarios[this.selectedUserIndex] = response;
        });
    }
  }

  selectUser(index: number, usuario: Usuario): void {
    console.log(index, usuario);
    this.selectedUserIndex = index;
    this.selectedUser = usuario;
  }

}
