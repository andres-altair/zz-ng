import { Component, EventEmitter, inject, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { Tarea } from '../model/tarea';
import { ServicioService } from '../servicio.service';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  tareaSvc = inject(ServicioService);

  // Inicialización de la tarea
  tarea: Tarea = {
    id: 0,
    nombre: '',
    descripcion: '',
    completada: false
  };

  mensaje: string = '';
  @Output() tareaAgregada = new EventEmitter<Tarea>();
  nombre: string = '';
  descripcion: string = '';

  agregarTarea(): void {
    const nuevaTarea: Omit<Tarea, 'id'> = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      completada: false
    };

    // Llamada al servicio para agregar la tarea
    this.tareaSvc.agregarTarea(nuevaTarea).pipe(
      catchError(err => {
        this.mensaje = 'Error al agregar la tarea';
        console.error(err);
        return of(null); // Manejo del error
      })
    ).subscribe(tarea => {
      if (tarea) {
        this.tareaAgregada.emit(tarea);
        this.mensaje = 'Tarea agregada exitosamente';
        this.nombre = '';
        this.descripcion = '';
      }
    });
  }
}
