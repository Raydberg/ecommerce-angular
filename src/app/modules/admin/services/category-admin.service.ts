import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CategoryResponse } from '@core/interfaces/category.interface';
import { PaginateResponse } from '@core/interfaces/http-response.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminService {

  private readonly baseUrl = `${environment.baseUrl}`

  private http = inject(HttpClient);



  getCategories(page: number = 1): Observable<PaginateResponse<CategoryResponse>> {
    const limit = 10
    const offset = (page - 1) * limit


    return this.http.get<PaginateResponse<CategoryResponse>>(`${this.baseUrl}/categories?limit=${limit}&offset=${offset}`)
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
