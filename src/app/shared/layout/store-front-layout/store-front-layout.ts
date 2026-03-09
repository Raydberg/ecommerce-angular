import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavBar } from "../../components/front-nav-bar/front-nav-bar";

@Component({
  selector: 'store-front-layout',
  imports: [RouterOutlet, FrontNavBar],
  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout { }
