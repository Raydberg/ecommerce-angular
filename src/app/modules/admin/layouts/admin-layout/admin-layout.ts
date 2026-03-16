import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,JsonPipe],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {

  authService = inject(AuthService)

  user = computed(() => this.authService.user())





}
