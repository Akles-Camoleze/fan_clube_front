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
import {Cidade} from "../../../models/Cidade";
import {TipoUsuario} from "../../../models/TipoUsuario";

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
    const endereco: Endereco = new Endereco();
    const cidade: Cidade = new Cidade();
    cidade.id = 1;
    endereco.rua = this.street?.value;
    endereco.numero = this.number?.value;
    endereco.bairro = this.district?.value;
    endereco.bairro = this.district?.value;
    endereco.cidade = cidade;

    this.enderecoService.register(endereco).pipe(
        takeUntil(this.destroy$),
        switchMap((endereco: Endereco) => this.registerPerson(endereco))
      ).pipe(
        takeUntil(this.destroy$),
        switchMap((pessoa: Pessoa) => this.registerUser(pessoa))
      ).subscribe((): void => {
        this.backToLogin();
      });
  }

  registerPerson(endereco: Endereco): Observable<any> {
    console.log(this.phone?.value);
    const pessoa: Pessoa = new Pessoa();
    pessoa.dataNascimento = this.birthdate?.value;
    pessoa.nome = this.name?.value;
    pessoa.sobrenome = this.lastname?.value;
    pessoa.telefone = this.phone?.value;
    pessoa.endereco = endereco;
    return this.pessoaService.register(pessoa);
  }

  registerUser(pessoa: Pessoa): Observable<any> {
    const tipoUsuario: TipoUsuario = new TipoUsuario();
    tipoUsuario.id = 2;
    this.usuario.pessoa = pessoa;
    this.usuario.tipoUsuario = tipoUsuario;
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
