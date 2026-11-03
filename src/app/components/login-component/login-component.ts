import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ServiceEmpleados } from '../../services/service.empleados';
import { Router } from '@angular/router';
import { Credencial } from '../../models/credencial';



@Component({
  selector: 'app-login-component',
  standalone: false,
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  @ViewChild("cajanombre") cajaNombre! : ElementRef;
  @ViewChild("cajacontrasenia") cajacontrasenia! : ElementRef;

  constructor(
    private _cdr : ChangeDetectorRef,
    private _service : ServiceEmpleados,
    private _router: Router,
  ){}
  async login(): Promise<void>{
    let nombre = this.cajaNombre.nativeElement.value;
    let pwd = this.cajacontrasenia.nativeElement.value;
    let credenciales = new Credencial(nombre, pwd)
    let response = await this._service.postLogin(credenciales)
    console.log(response);
    sessionStorage.setItem("TOKEN", response.response)
    this._router.navigate(["/"])

  }
}
