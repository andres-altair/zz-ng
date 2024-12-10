import { inject, Injectable } from '@angular/core';
import { Tarea } from './model/tarea';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url = 'http://localhost:3000/tareas'; 


  private http = inject(HttpClient);

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url).pipe(
      catchError(this.handleError) 
    );
  }

  agregarTarea(tarea: Omit<Tarea, 'id'>): Observable<Tarea> {
    return this.http.post<Tarea>(this.url, tarea).pipe(
      catchError(this.handleError) 
    );
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError) 
    );
  }

  actualizarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.url}/${tarea.id}`, tarea).pipe(
      catchError(this.handleError) 
    );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error); 
    return throwError(() => new Error('Error en la solicitud, intenta nuevamente más tarde.'));
  }
}