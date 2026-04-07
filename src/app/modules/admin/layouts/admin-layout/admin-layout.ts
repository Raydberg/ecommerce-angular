import { JsonPipe, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, JsonPipe, NgClass],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  authService = inject(AuthService)
  user = computed(() => this.authService.user())
  router = inject(Router)

  onLogout() {
    this.authService.logout()
    this.router.navigateByUrl("/")
  }

}
