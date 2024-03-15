import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../services/Proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  proveedores: any;

  constructor(private proveedorService: ProveedorService) {
    if(!localStorage.getItem('proveedores')){
      this.crearProveedor();
      this.getProveedores();
    }
    else {
      this.getProveedores();
    }
   }

  async ngOnInit() {
    await console.log('ProveedoresPage')
  }

  crearProveedor() {
    //create a list with the providers full
    let proveedores = [
      {
        id: 1,
        company: 'The Coca-Cola Company',
        phone: 123456789,
        email: 'info@coca-colacompany.com',
        address: '123 Coca-Cola Street, Atlanta, GA'
      },
      {
        id: 2,
        company: 'PepsiCo',
        phone: 987654321,
        email: 'info@pepsico.com',
        address: '456 Pepsi Avenue, Purchase, NY'
      },
      {
        id: 3,
        company: 'Grupo Peñafiel',
        phone: 555555555,
        email: 'info@grupo-penafiel.com',
        address: '789 Peñafiel Street, Mexico City'
      },
      {
        id: 4,
        company: 'Keurig Dr Pepper',
        phone: 111111111,
        email: 'info@kdp.com',
        address: '101 Dr Pepper Drive, Plano, TX'
      },
      {
        id: 5,
        company: 'Grupo Modelo',
        phone: 222222222,
        email: 'info@grupomodelo.com',
        address: '202 Corona Boulevard, Mexico City'
      }
    ];
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
    console.log('Proveedores creados');
  }

  getProveedores() {
    this.proveedores = this.proveedorService.getProveedores();
  }

}
