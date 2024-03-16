import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  cantidadMinima: any
  notificarPor: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {

   }

 async ngOnInit() {
  await console.log('config page')
  }

  guardarConfiguracion() {
   //guardar cantidadminima en localStorage en un json
    localStorage.setItem('config', JSON.stringify({cantidadMinima: this.cantidadMinima}))
  }

}
