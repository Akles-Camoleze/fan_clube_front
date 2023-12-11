import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Endereco} from "../../../entities/Endereco";
import {Arquivo} from "../../../entities/Arquivo";
import {Evento} from "../../../entities/Evento";
import {Cidade} from "../../../entities/Cidade";

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})
export class RegisterEventComponent {
  @Input() visible: boolean = false;
  @Input() evento?: Evento;
  @Output() onConfirm: EventEmitter<Evento> = new EventEmitter<Evento>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      capacity: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      value: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      file: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.buildEvento();
  }

  buildEvento(): void {
    if (this.evento) {
      console.log(this.evento.data);
      this.name?.setValue(this.evento.nome);
      this.capacity?.setValue(this.evento.capacidade);
      this.date?.setValue(new Date(this.evento.data));
      this.description?.setValue(this.evento.descricao);
      this.value?.setValue(this.evento.valor);
      this.file?.setValue(this.evento.arquivo);
      this.street?.setValue(this.evento.endereco.rua);
      this.number?.setValue(this.evento.endereco.numero);
      this.district?.setValue(this.evento.endereco.bairro);
      this.city?.setValue(this.evento.endereco.cidade.nome);
      this.uf?.setValue(this.evento.endereco.cidade.uf);
    }
  }

  buildForm(): Evento {
    const evento: Evento = new Evento();
    evento.nome = this.name?.value;
    evento.capacidade = this.capacity?.value;
    evento.data = this.date?.value;
    evento.descricao = this.description?.value;
    evento.valor = this.value?.value;

    evento.arquivo = new Arquivo();
    evento.arquivo.caminho = this.file?.value;
    this.buildAddress(evento);
    return evento;
  }

  buildAddress(evento: Evento): void {
    evento.endereco = new Endereco();
    evento.endereco.rua = this.street?.value;
    evento.endereco.numero = this.number?.value;
    evento.endereco.bairro =  this.district?.value;

    evento.endereco.cidade = new Cidade();
    evento.endereco.cidade.id = 1;
  }

  onCloseAction(): void {
    this.visible = false;
    this.onClose.emit();
  }

  onConfirmAction(): void {
    if (this.form.invalid) return;
    this.visible = false;
    this.onConfirm.emit(this.buildForm());
  }

  get name() {
    return this.form.get('name');
  }

  get capacity() {
    return this.form.get('capacity');
  }

  get date() {
    return this.form.get('date');
  }

  get description() {
    return this.form.get('description');
  }

  get value() {
    return this.form.get('value');
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

  get file() {
    return this.form.get('file');
  }
}
