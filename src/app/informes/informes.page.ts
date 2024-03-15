import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/Inventario/inventario.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

  informes: any


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
    await console.log('InformesPage')
  }

  //get all information and save it in a json file
  async getInformes() {
    this.informes = await this.inventarioService.getInventario();
  }



}
