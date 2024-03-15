import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/Pedidos/pedidos.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any;

  constructor(private pedidosService: PedidosService) { 
    if(!localStorage.getItem('pedidos')){
      this.crearPedidos();
      this.getPedidos();
    }
    else {
      this.getPedidos();
    }
  }

 async ngOnInit() {
  await console.log('PedidosPage');
  }

  crearPedidos() {
    let pedidos = [
      {
        proveedor: 'The Coca-Cola Company',
        producto: 'Coca Cola',
        cantidad: 3,
        total: 4.50
      },
      {
        proveedor: 'PepsiCo',
        producto: 'Pepsi',
        cantidad: 2,
        total: 3.00
      },
      {
        proveedor: 'Grupo Peñafiel',
        producto: 'Peñafiel',
        cantidad: 1,
        total: 1.50
      },
      {
        proveedor: 'Keurig Dr Pepper',
        producto: 'Dr Pepper',
        cantidad: 4,
        total: 6.00
      },
      {
        proveedor: 'Grupo Modelo',
        producto: 'Corona',
        cantidad: 3,
        total: 4.50
      }
    ];
    localStorage.setItem('pedidos',JSON.stringify(pedidos))
  }

  getPedidos() {
    this.pedidos = this.pedidosService.getPedidos();
  }

}
