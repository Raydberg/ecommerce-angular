import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from "@shared/components/toast";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  template: `
  <router-outlet />
  <toast/>
  `
})
export class App { }
