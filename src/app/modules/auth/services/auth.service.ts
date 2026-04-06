import { computed, inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

    private readonly http = inject(HttpClient)
    private readonly baseUrl = environment.baseUrl


    checkStatusResouce = rxResource({
        stream: () => this.checkStatus()
    })

    authStatus = computed<AuthStatus>(() => {
        const status = this.checkStatusResouce.status()
        if (status === 'loading') return "checking";
        if (status === 'error') return 'no-authenticated';
        const response = this.checkStatusResouce.value()
        return (response && response.user) ? 'authenticated' : 'no-authenticated';
    })

    user = computed(() => {
        const status = this.checkStatusResouce.status()
        if (status === 'loading' || status === 'error') return null;
        return this.checkStatusResouce.value()?.user ?? null
    })

    isAdmin = computed(() => {
        const status = this.checkStatusResouce.status()
        if (status === 'loading' || status === 'error') return null;
        return this.user()?.roles.includes("ADMIN") ?? false
    })

    csrfToken = computed(() => {
        const status = this.checkStatusResouce.status()
        //No retornamos nada mientras hace la peticion
        // ya que si llama directo a token da 403 y da error
        if (status === 'loading' || status === 'error') return null;

        return this.checkStatusResouce.value()?.csrfToken ?? null
    })

    login(options: Omit<AuthOptions, "fullName">): Observable<boolean> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, {
            email: options.email,
            password: options.password
        }, { withCredentials: true })
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError(error => this.handleAuthError(error))
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


    checkStatus(): Observable<AuthResponse> {
        return this.http.get<AuthResponse>(`${this.baseUrl}/auth/check-status`, { withCredentials: true })
            .pipe(
                catchError((error) => { throw error })
            );
    }

    private handleAuthSuccess(resp: AuthResponse): boolean {
        console.log(resp)
        this.checkStatusResouce.set(resp)
        return true
    }


    logout(): void {
        this.http.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
            finalize(() => {
                this.checkStatusResouce.set(undefined)
            })
        ).subscribe()
    }


    private handleAuthError(error: unknown): Observable<boolean> {
        console.error("Error Auth", error)
        this.checkStatusResouce.set(undefined)
        return of(false)
    }
}