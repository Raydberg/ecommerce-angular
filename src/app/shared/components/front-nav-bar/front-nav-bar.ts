import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-nav-bar.html',
})
export class FrontNavBar {

  authService = inject(AuthService)


}
