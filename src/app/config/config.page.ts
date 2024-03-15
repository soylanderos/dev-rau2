import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  cantidadMinima: any

  constructor() {

   }

 async ngOnInit() {
  await console.log('config page')
  }

  guardarConfiguracion() {
   //guardar cantidadminima en localStorage en un json
    localStorage.setItem('config', JSON.stringify({cantidadMinima: this.cantidadMinima}))
  }

}
