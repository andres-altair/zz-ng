import { Component, Input, OnInit, inject } from '@angular/core';
 import { Tarea } from '../model/tarea';
 import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ServicioService } from '../servicio.service';
import { ElementoComponent } from "../elemento/elemento.component";
import {MatSnackBarAction, matSnackBarAnimations, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [FormsModule, NgFor, ElementoComponent,NgIf,MatCardModule,
    MatSnackBarModule,MatListModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit{
  tareas: Tarea[] = [];
  mensaje: string = '';


  tareaService = inject(ServicioService);

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.obtenerTareas().subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
      }
    });
  }

  eliminarTarea(tarea: Tarea): void {
    this.tareaService.eliminarTarea(tarea.id).subscribe(() => {
      this.tareas = this.tareas.filter(t => t.id !== tarea.id);
      this.mensaje = `Eliminando "${tarea.nombre}" correctamente.`; // Usa el nombre de la tarea
      setTimeout(() => {
        this.mensaje = ''; // Limpia el mensaje después de 3 segundos
      }, 3000);
    });
  }


  actualizarTarea(tarea: Tarea): void {
    tarea.completada = !tarea.completada; // Cambia el estado de completado
    this.tareaService.actualizarTarea(tarea).subscribe();
  }

  agregarTarea(tarea: Tarea): void {
    this.tareaService.agregarTarea(tarea).subscribe(nuevaTarea => {
      this.tareas.push(nuevaTarea);
    });
  }
}
