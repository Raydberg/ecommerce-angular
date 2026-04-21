import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly baseUrl = environment.baseUrl
  private readonly http = inject(HttpClient)


  // getUser(): Observable<User> {
  //   return this.http.get<User>(`${this.baseUrl}/user`)
  // }

}
