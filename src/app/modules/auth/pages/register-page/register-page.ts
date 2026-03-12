import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {


  authService = inject(AuthService)
  router = inject(Router)
  hasError = signal(false)
  isPosting = signal(false)
  fb = inject(FormBuilder)

  registerForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", [Validators.required]],
    fullName: ["", [Validators.required]]
  })


  onSubmit() {

    if (!this.registerForm.valid) {
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
      return;
    };

    const { email, fullName, password } = this.registerForm.value

    console.log(this.registerForm.value)
    this.authService.register({
      email: email ?? "",
      password: password ?? "",
      fullName: fullName ?? "",
    }).subscribe(isAuthenticated => {
      // console.log(isAuthenticated)
      if (isAuthenticated) {
        this.router.navigateByUrl("/")
        return;
      }
      this.hasError.set(true);
    })

  }

}
