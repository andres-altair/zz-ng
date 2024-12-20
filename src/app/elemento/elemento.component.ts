import { Component, EventEmitter, Input, model, Output } from '@angular/core';
import { Tarea } from '../model/tarea';
import { NgClass, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-elemento',
  standalone: true,
  imports: [MatButtonModule,
    MatListModule,
    MatIconModule,
  NgClass],
  templateUrl: './elemento.component.html',
  styleUrl: './elemento.component.css'
})
export class ElementoComponent {
  @Input() tarea!: Tarea; // Recibe la tarea
  @Output() tareaEliminada = new EventEmitter<Tarea>(); // Emite la tarea eliminada
  @Output() tareaActualizada = new EventEmitter<Tarea>(); // Emite la tarea actualizada

  eliminar() {
    this.tareaEliminada.emit(this.tarea); // Emite la tarea completa al eliminar
  }

  actualizar() {
    this.tareaActualizada.emit(this.tarea); // Emite la tarea para actualizar
  }
}
