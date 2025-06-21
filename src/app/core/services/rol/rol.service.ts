import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rol} from '../../../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'http://localhost:8080/Rol';
  constructor(private http: HttpClient) { }
  getRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}`);
  }
  getRolById(id:number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }
  createRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }
  updateRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol);
  }
  deleteRol(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
