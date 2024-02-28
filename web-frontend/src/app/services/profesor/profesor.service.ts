import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private http = inject(HttpClient);
  constructor() {}

  getTeachers(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/profesor/listar');
  }

  hireTeacher(payload: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/profesor/contratar',payload);
  }

}
