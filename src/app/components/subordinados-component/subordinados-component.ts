import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { ServiceEmpleados } from '../../services/service.empleados';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subordinados-component',
  standalone: false,
  styleUrl: './subordinados-component.css',
  templateUrl: './subordinados-component.html',
})
export class SubordinadosComponent implements OnInit {
  public subordinados! : Array<Empleado>
  public token = sessionStorage.getItem("TOKEN");

  constructor(
    private _cdr : ChangeDetectorRef,
    private _service : ServiceEmpleados,
    private _router: Router
  ){}

  mandaralogin(){
    this._router.navigate(["/"])

  }
  async ngOnInit(): Promise<void> {
    this.subordinados= await this._service.obtenerSubordinados();
    this._cdr.detectChanges();
  }
}
