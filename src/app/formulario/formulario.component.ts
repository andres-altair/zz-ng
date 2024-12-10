import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../model/tarea';
import { ServicioService } from '../servicio.service';
import { catchError, of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, NgIf,NgClass],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'] 
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

  // Propiedades enlazadas a los campos de entrada
  nombre: string = '';
  descripcion: string = '';

  agregarTarea(): void {
    if (!this.nombre || !this.descripcion) {
      this.mensaje = 'Por favor, complete todos los campos.';
      this.resetMensaje(); // Llamar a la función para resetear el mensaje
      return;
    }

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
        this.resetMensaje(); // Llamar a la función para resetear el mensaje
        return of(null); // Manejo del error
      })
    ).subscribe(tarea => {
      if (tarea) {
        this.tareaAgregada.emit(tarea);
        this.mensaje = 'Tarea agregada exitosamente';
        this.nombre = '';
        this.descripcion = '';
        this.resetMensaje(); // Llamar a la función para resetear el mensaje
      }
    });
  }

  // Función para resetear el mensaje después de 3 segundos
  private resetMensaje(): void {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000); // 3000 milisegundos = 3 segundos
  }
}
