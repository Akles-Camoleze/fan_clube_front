import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

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
    const usuario: Usuario = {email: this.email!.value, senha: this.password!.value}
    this.usuarioService.login(usuario).subscribe(usuario => {
      console.log(usuario);
    });
  }

  goToregister(): void {
    this.router.navigate(['/register']);
  }

}
