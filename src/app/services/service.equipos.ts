import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Equipo } from "../models/equipos";
import { environment } from "../../environments/environment.development";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServiceEquipos{
    constructor(private _http : HttpClient){}

    async getEquipos(): Promise<Equipo[]>{
        let request = "api/equipos";
        let url = environment.urlEquipos+request;
        return firstValueFrom(
            this._http.get<Equipo[]>(url)
        )
    }
}