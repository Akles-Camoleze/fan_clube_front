import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../entities/Usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {finalize, Subscription} from "rxjs";
import {MenuItem} from "primeng/api";
import {TipoUsuario} from "../../../entities/TipoUsuario";
import {TipoUsuarioService} from "../../../services/tipo-usuario.service";

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
  tiposUsuarios: TipoUsuario[] = [];
  tiposUsuarios$!: Subscription;
  confirmationDialog: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.setItems();
  }

  getUsers(): void {
    this.usuarios$ = this.usuarioService.getAll()
      .pipe(finalize((): void => this.usuarios$?.unsubscribe()))
      .subscribe((response: Usuario[]): void => {
        this.usuarios = response;
        this.getUserTypes();
      });
  }

  setItems(): void {
    this.items = [
      {
        icon: 'pi pi-trash',
        label: 'Excluir',
        command: (): void => this.showConfirmation()
      },
      {
        icon: 'pi pi-pencil',
        label: 'Editar',
        command: (): void => this.showEdit()
      }
    ];
  }

  getUserTypes(): void {
    this.tiposUsuarios$ = this.tipoUsuarioService.getAll()
      .pipe(finalize((): void => this.tiposUsuarios$.unsubscribe()))
      .subscribe((response: TipoUsuario[]): void => {
        this.tiposUsuarios = response;
      });
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
    this.selectedUserIndex = index;
    this.selectedUser = usuario;
  }

  deleteUser(): void {
    this.usuarios$ = this.usuarioService.delete(this.selectedUser?.id!)
      .pipe(finalize((): void => this.usuarios$?.unsubscribe()))
      .subscribe((): void => {
        delete this.selectedUser;
        this.usuarios.splice(this.selectedUserIndex, 1);
      });
  }

  showConfirmation(value: boolean = true): void {
    this.confirmationDialog = value;
  }

}
