import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginateResponse } from '@core/interfaces/http-response.interface';
import { User } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  private readonly baseUrl = `${environment.baseUrl}`
  private readonly http = inject(HttpClient)


  getAllUsers(page: number = 1): Observable<PaginateResponse<User>> {

    const limit = 10
    const offset = (page - 1) * limit

    return this.http.get<PaginateResponse<User>>(`${this.baseUrl}/user/all`, {
      params: {
        limit,
        offset
      }
    })
  }
}
