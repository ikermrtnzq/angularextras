import { ChangeDetectorRef, Component, ElementRef, input, ViewChild } from '@angular/core';
import { Service } from '../../services/service';
import { FileModel } from '../../models/filemodel';

@Component({
  selector: 'app-subir-component',
  standalone: false,
  templateUrl: './subir-component.html',
  styleUrl: './subir-component.css',
})
export class SubirComponent {
  @ViewChild('imagenInput') imagenInput! : ElementRef;
  public imagen!: File;
  public urlFile! : string;
  constructor(
    private _service : Service,
    private _cdr : ChangeDetectorRef
  ){}
  async seleccionarImagen(): Promise<void> {
    const img = this.imagenInput.nativeElement.files[0];
    //console.log(seleccionada)
    await this._service.subirFoto(img) 
  }

  subir(): void {
    console.log("holaaa")
    let file = this.imagenInput.nativeElement.files[0]
    let path = this.imagenInput.nativeElement.value.split("\\")
    let fileName = path[2];
    let reader = new FileReader();
    reader.onloadend = () => {
      let  buffer : ArrayBuffer;
      buffer = reader.result as ArrayBuffer;
      let base64 : string;
      base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
      let fileModel = new FileModel(fileName, base64);
      this._service.postFoto(fileModel).subscribe((response) => {

      })
      
    }
    reader.readAsArrayBuffer(file);

  }
}
