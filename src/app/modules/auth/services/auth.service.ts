import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '@auth/interfaces/user.interface';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';

interface AuthOptions {
    email: string,
    password: string,
    fullName: string

}


type AuthStatus = "checking" | "authenticated" | "no-authenticated"


@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authStatus = signal<AuthStatus>("checking")
    private _user = signal<User | null>(null)
    private _token = signal<string | null>(localStorage.getItem("token"))

    private readonly http = inject(HttpClient)
    private readonly baseUrl = environment.baseUrl


    checkStatusResouce = rxResource({
        stream: () => this.checkStatus()
    })

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus() === 'checking') return "checking";
        if (this._user()) return "authenticated"
        return "no-authenticated"
    })

    user = computed<User | null>(() => this._user())

    token = computed(() => this._token())

    login(options: Omit<AuthOptions, "fullName">): Observable<boolean> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, {
            email: options.email,
            password: options.password
        }).pipe(
            map((resp) => this.handleAuthSuccess(resp)),
            catchError((error) => this.handleAuthError(error))
        )
    }



    register(options: AuthOptions): Observable<boolean> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, {
            email: options.email,
            password: options.password,
            fullName: options.fullName
        }).pipe(
            map(resp => this.handleAuthSuccess(resp)),
            catchError(error => this.handleAuthError(error))
        )
    }


    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem("token")
        if (!token) {
            this.logout()
            return of(false)
        }

        return this.http.get<AuthResponse>(`${this.baseUrl}/auth/check-status`)
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error) => this.handleAuthError(error))
            );
    }

    logout() {
        this._user.set(null)
        this._authStatus.set("no-authenticated")
        this._token.set(null)
        localStorage.removeItem("token")
    }



    private handleAuthSuccess(resp: AuthResponse): boolean {
        console.log(resp)
        this._user.set(resp.user)
        this._authStatus.set("authenticated")
        this._token.set(resp.token)
        localStorage.setItem("token", resp.token)
        return true
    }


    private handleAuthError(error: unknown): Observable<boolean> {
        console.log(error)
        this.logout()
        return of(false)
    }
}