import { JsonPipe, NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroArrowRightOnRectangle, heroChartBar, heroChartPie, heroRectangleStack, heroUser } from '@ng-icons/heroicons/outline';
import { heroInboxSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIcon],
  viewProviders: [provideIcons({
    heroInboxSolid,
    heroRectangleStack,
    heroChartPie,
    heroArrowRightOnRectangle,
    heroUser
  })],
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
