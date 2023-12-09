import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Usuario} from "../../../../entities/Usuario";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TipoUsuarioService} from "../../../../services/tipo-usuario.service";
import {TipoUsuario} from "../../../../entities/TipoUsuario";
import {finalize, Subscription} from "rxjs";

@Component({
  selector: 'app-edit-user[usuario]',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() usuario!: Usuario;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  tiposUsuarios: TipoUsuario[] = [];
  tiposUsuarios$!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private tipoUsuarioService: TipoUsuarioService
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userType: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && changes['visible'].currentValue) {
      this.name?.setValue(this.usuario.nome);
      this.email?.setValue(this.usuario.email);
      this.userType?.setValue(this.usuario.tipoUsuario.id);
      this.tiposUsuarios$ = this.tipoUsuarioService.getAll()
        .pipe(finalize((): void => this.tiposUsuarios$.unsubscribe()))
        .subscribe((response: TipoUsuario[]): void => {
          this.tiposUsuarios = response;
        });
    }
  }

  buildUser(): void {
    this.usuario.nome = this.name?.value;
    this.usuario.email = this.email?.value;
    this.usuario.tipoUsuario.id = this.userType?.value;
  }

  onCloseAction(): void {
    this.visible = false;
    this.onClose.emit();
  }

  onConfirmAction(): void {
    this.visible = false;
    this.buildUser();
    this.onConfirm.emit();
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get userType() {
    return this.form.get('userType');
  }
}
