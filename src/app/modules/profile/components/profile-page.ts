import { JsonPipe } from '@angular/common';
import { Component, inject, effect, computed, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroPencilSquare } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'profile',
  imports: [ReactiveFormsModule, JsonPipe, FormErrorLabel, NgIcon],
  viewProviders: [provideIcons({
    heroPencilSquare
  })],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  constructor() {
    effect(() => {
      if (!this.authService.user()) return null;
      return this.profileForm.patchValue(this.authService.user()!)
    })
  }
  authService = inject(AuthService)
  isEditing = signal<boolean>(true)
  fb = inject(FormBuilder)

  profileForm = this.fb.nonNullable.group({
    fullName: new FormControl({ value: "", disabled: true }),
    email: new FormControl({ value: "", disabled: true }),
    isActive: new FormControl({ value: true, disabled: true }),
    roles: new FormControl({ value: [''], disabled: true })
  })


  onEdit() {
    this.isEditing.set(true)
    this.profileForm.enable()
  }

  onCancel() {
    this.isEditing.set(false)
    this.profileForm.disable()
    this.profileForm.patchValue(this.authService.user()!)
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.disable()
      this.profileForm.patchValue(this.authService.user()!)
      return;
    }

    const profileUpdate = this.profileForm.value

    console.log("Guardando", profileUpdate)

    this.isEditing.set(false)
    this.profileForm.disable()
    // this.profileForm.pristine
    // this.profileForm.markAllAsTouched()
    // this.profileForm.reset()
  }





}
