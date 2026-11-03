import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-pdf-component',
  standalone: false,
  templateUrl: './pdf-component.html',
  styleUrl: './pdf-component.css',
})
export class PdfComponent {

  generarDocumento() : void {
    let  documento : jsPDF = new jsPDF();
    documento.setFontSize(18);
    documento.text("Mi documento", 10, 10);
    const headers = [["Nombre", "Email","Edad"]];
    const data = [
      ["Diana", "diana@gmail.com", 44],
      ["Mari", "mari@gmail.com", 20],
      ["Patricia", "patricia@gmail.com", 80],
    ]
    autoTable(documento,{
      head: headers,
      body: data,
      startY: 20
    })

    documento.save("personas.pdf")
  }
}
