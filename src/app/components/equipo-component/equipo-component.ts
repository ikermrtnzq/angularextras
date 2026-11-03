import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Equipo } from '../../models/equipos';
import { ServiceEquipos } from '../../services/service.equipos';

@Component({
  selector: 'app-equipo-component',
  standalone: false,
  templateUrl: './equipo-component.html',
  styleUrl: './equipo-component.css',
})
export class EquipoComponent implements OnInit{
  public equipos! : Array<Equipo>
  constructor(
    private _service : ServiceEquipos,
    private _cdr : ChangeDetectorRef,

  ){}

  async ngOnInit(): Promise<void> {
    this.equipos = await this._service.getEquipos();
    this._cdr.detectChanges()
  }

}
