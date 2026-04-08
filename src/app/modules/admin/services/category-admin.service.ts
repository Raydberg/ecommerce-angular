import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CategoryResponse } from '@core/interfaces/category.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {

  private readonly baseUrl = `${environment.baseUrl}`

  private http = inject(HttpClient);



  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.baseUrl}/categories`)
  }

  createCategory(payload: { name: string, slug?: string }): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.baseUrl}/categories`, {
      ...payload
    }).pipe(
      // catchError()
    )
  }

  deleteCategory(id: string): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(`${this.baseUrl}/categories/${id}`)
  }


  updateCategory(id: string, payload: { name: string, slug?: string }): Observable<CategoryResponse> {
    return this.http.patch<CategoryResponse>(`${this.baseUrl}/categories/${id}`, {
      ...payload
    })
  }



}
