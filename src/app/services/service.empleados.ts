import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangeDetectorRef, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Credencial } from "../models/credencial";
import { Empleado } from "../models/empleado";

@Injectable()

export class ServiceEmpleados{
    url  = environment.urlEmpleados;
    constructor(
        private _http : HttpClient
    ){}

    async postLogin(credenciales : Credencial): Promise<any>{
        let endpoint = "auth/login";
        let json = JSON.stringify(credenciales);
        let header = new HttpHeaders().set("content-type","application/json");
        return firstValueFrom(
            this._http.post(this.url+endpoint, json, {headers: header})
        )
    }
    async obtenerPerfil() : Promise<Empleado>{
        const token = sessionStorage.getItem("TOKEN");
        //creamos un objeto header para el type
        let header= new HttpHeaders().set("authorization", "bearer "+ token);
        let endpoint= "api/Empleados/PerfilEmpleado";
        return firstValueFrom(
            this._http.get<Empleado>(this.url+endpoint, {headers: header})
        )
    }
    
    async obtenerSubordinados() : Promise<Empleado[]>{
        //creamos un objeto header para el type
        let endpoint= "api/Empleados/subordinados";
        return firstValueFrom(
            this._http.get<Empleado[]>(this.url+endpoint)
        )
    }
}