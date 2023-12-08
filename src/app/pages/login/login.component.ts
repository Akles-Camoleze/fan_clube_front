import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {finalize, Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  login$?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  enter(): void {
    if (this.form.invalid) return;
    const usuario: Usuario = new Usuario();
    usuario.email = this.email!.value;
    usuario.senha = this.password!.value;
    this.login$ = this.usuarioService.login(usuario)
      .pipe(finalize((): void => this.login$?.unsubscribe()))
      .subscribe((): void => {
        this.goToHome();
      });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}
