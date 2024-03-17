import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InventarioService } from '../services/Inventario/inventario.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

  informes: any
  @ViewChild('barChart')
  barChart!: ElementRef;
  chart: any;
  chart2: any;

  masVendidos: any[] = [];
  menosVendidos: any[] = [];
  nextAgostarse: any = [];
  limiteMasVendidos = 5; // Puedes ajustar este límite según tus necesidades

  constructor(
    private inventarioService: InventarioService
  ) {
    if (!localStorage.getItem('informes')) {
      this.getInformes();

    }
    else {
      this.getInformes();

    }
   }

  async ngOnInit() {
    await console.log('InformesPage');
  }

  async getInformes() {
    this.informes = await this.inventarioService.getInventario();
    this.masVendidos = this.getMasVendidos(this.informes, this.limiteMasVendidos);
    this.menosVendidos = this.getMenosVendidos(this.informes, this.limiteMasVendidos);
    console.log(this.masVendidos);
    this.createBarChart();
  }

  getMasVendidos(productos: any[], limite: number): any[] {
    // Ordenar los productos por cantidad en orden descendente
    productos.sort((a, b) => a.quantity - b.quantity);

    // Tomar los primeros 'limite' productos como los más vendidos
    return productos.slice(0, limite);

  }

  createBarChart() {
    const ctx = this.barChart.nativeElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.masVendidos.map(producto => producto.name),
        datasets: [{
          label: 'Cantidad',
          data: this.masVendidos.map(producto => producto.quantity * producto.price),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
    });
  }

  getMenosVendidos(productos: any[], limite: number): any[] {{
    // Ordenar los productos por cantidad en orden ascendente
    productos.sort((a, b) => b.quantity - a.quantity);

    // Tomar los primeros 'limite' productos como los menos vendidos
    return productos.slice(0, limite);
  }
  }

}
