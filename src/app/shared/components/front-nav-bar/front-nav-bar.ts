import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-nav-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './front-nav-bar.html',
})
export class FrontNavBar { }
