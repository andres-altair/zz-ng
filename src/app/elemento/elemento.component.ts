import { Component, EventEmitter, model, Output } from '@angular/core';
import { Tarea } from '../model/tarea';
import { NgForm, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-elemento',
  standalone: true,
  imports: [NgFor],
  templateUrl: './elemento.component.html',
  styleUrl: './elemento.component.css'
})
export class ElementoComponent {
  tareas: Tarea[] = [];
  private idCounter: number = 1;

  agregarTarea(tarea: Omit<Tarea, 'id'>) {
    const nuevaTarea: Tarea = { id: this.idCounter++, ...tarea };
    this.tareas.push(nuevaTarea);
  }
}
