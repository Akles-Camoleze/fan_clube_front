import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent {
  @Input() visible: boolean = false;
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  onCloseAction(): void {
    this.visible = false;
    this.onClose.emit();
  }

  onConfirmAction(): void {
    this.visible = false;
    this.onConfirm.emit();
  }

}
