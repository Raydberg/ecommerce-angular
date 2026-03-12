import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {

  authService = inject(AuthService)
  fb = inject(FormBuilder)
  hasError = signal(false)
  isPosting = signal(false)
  router = inject(Router)

  loginForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })



  onSubmit() {
    if (!this.loginForm.valid) {
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
      return;
    }
    const { email = "", password = "" } = this.loginForm.value

    this.authService.login({
      email: email ?? "",
      password: password ?? ""
    }).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl("/")
        return
      }
      this.hasError.set(true)
    })

    console.log(this.loginForm.value)
  }



}
