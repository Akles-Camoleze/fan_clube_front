import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "../../../../utils/CustomValidators";
import {Usuario} from "../../../models/Usuario";
import {PessoaService} from "../../../services/pessoa.service";
import {EnderecoService} from "../../../services/endereco.service";
import {UsuarioService} from "../../../services/usuario.service";
import {Endereco} from "../../../models/Endereco";
import {Observable, Subject, switchMap, takeUntil} from "rxjs";
import {Pessoa} from "../../../models/Pessoa";

@Component({
  selector: 'app-register-pessoa',
  templateUrl: './register-pessoa.component.html',
  styleUrls: ['./register-pessoa.component.scss'],
})
export class RegisterPessoaComponent implements OnInit {
  form: FormGroup;
  usuario!: Usuario;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pessoaService: PessoaService,
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      birthdate: new FormControl('', [Validators.required, CustomValidators.minAgeValidator(18)]),
      phone: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ]),
    })
  }

  ngOnInit(): void {
    this.usuario = window.history.state.usuario;
  }

  get name() {
    return this.form.get('name');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  get phone() {
    return this.form.get('phone');
  }

  get street() {
    return this.form.get('street');
  }

  get number() {
    return this.form.get('number');
  }

  get district() {
    return this.form.get('district');
  }

  get city() {
    return this.form.get('city');
  }

  get uf() {
    return this.form.get('uf');
  }

  enter(): void {
    if (this.form.invalid) return;
    const endereco: Endereco = {
      rua: this.street?.value,
      numero: this.number?.value,
      bairro: this.district?.value,
      idCidade: 1
    }
    this.enderecoService.register(endereco).pipe(
        takeUntil(this.destroy$),
        switchMap((endereco: any) => this.registerPerson(endereco))
      ).pipe(
        takeUntil(this.destroy$),
        switchMap((pessoa: Pessoa) => this.registerUser(pessoa))
      ).subscribe((): void => {
        this.backToLogin();
      });
  }

  registerPerson(endereco: Endereco): Observable<any> {
    console.log(this.phone?.value);
    const pessoa: Pessoa = {
      dataNascimento: this.birthdate?.value,
      nome: this.name?.value,
      sobrenome: this.lastname?.value,
      telefone: this.phone?.value,
      idEndereco: endereco.id
    };
    return this.pessoaService.register(pessoa);
  }

  registerUser(pessoa: Pessoa): Observable<any> {
    this.usuario.idPessoa = pessoa.id;
    this.usuario.idTipoUsuario = 2;
    return this.usuarioService.register(this.usuario);
  }

  backToUserRegister(): void {
    this.router.navigate(['/register'], {
      state: {usuario: this.usuario}
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
