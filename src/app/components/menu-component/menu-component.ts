import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  standalone: false,
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {

  constructor(
    private _router : Router
  ){}
  logout() : void {
    sessionStorage.removeItem("TOKEN");
    this._router.navigate(["/login"])
  }
}
