import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tarea } from '../model/tarea';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit{

  tareas: Tarea[] = [];

  constructor(private tareaService: ServicioService) {}

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
  eliminarTarea(id: number): void {
     this.tareaService.eliminarTarea(id).subscribe(() => { 
      this.tareas = this.tareas.filter(tarea => tarea.id !== id); 
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
