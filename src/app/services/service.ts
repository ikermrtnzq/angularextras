import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { FileModel } from "../models/filemodel";

@Injectable()
export class Service{
    url  = environment.url;
    constructor(
        private _http : HttpClient
    ){}
    
    async subirFoto(imagen: File): Promise<any> {
        const base64 = await this.convertirBase64(imagen);

        const datos = {
            fileName: imagen.name,
            fileContent: base64
        };
        let json = JSON.stringify(datos);
        let endpoint = "api/testingfiles"
        let header = new HttpHeaders().set('content-type', 'application/json');

        
        return firstValueFrom(
            this._http.post(this.url+endpoint, json,{ headers: header })
        );
    }
    postFoto(filemodel: FileModel): Observable<any> {
        let json= JSON.stringify(filemodel);
        let header = new HttpHeaders().set('content-type', 'application/json');
        let endpoint = "api/testingfiles"
        return this._http.post(this.url+endpoint, json, {headers : header})
    }

    private convertirBase64(imagen: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imagen);

            reader.onload = () => {
                const resultado = reader.result as string;
                resolve(resultado.split(',')[1]);
            };
            reader.onerror = () => reject(reader.error);
        });
    }

}