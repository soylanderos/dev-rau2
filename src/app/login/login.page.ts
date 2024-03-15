import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

//importar herramientas
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //declarar variable
  loginForm: FormGroup;

  constructor(public fb:FormBuilder, private alertController: AlertController, private router: Router) {

      //inicializar formulario
      this.loginForm = this.fb.group({
        //cuerpo de la tabla bd
        'nombre': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
      })
   }

  async ngOnInit() {
    console.log('Hola');
  }

  //crear funcion para obtner los datos almacenados en el localstore
 async login(){

    //crear una variable del formulario -- objeto
    let f = this.loginForm.value;
    let usuarioString = localStorage.getItem('usuario');
    console.log(usuarioString)
    //validacion
    if(usuarioString !== null){
      let usuario = JSON.parse(usuarioString);
      //validar el usuario y contraseña
      if (usuario.nombre == f.nombre && usuario.password == f.password) {
        //alert
        const alert = await this.alertController.create({
          header: 'Bienvenido ' + usuario.nombre + '!',
        });
        await alert.present();
        this.router.navigate(['/home']);

      }
      else {
        console.log('Usuario incorrecto');
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Nombre o contraseña incorrectos',
          message: 'Por favor, verifica que el nombre y la contraseña sean correctos.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }

    }
    else {
      console.log('No hay usuarios registrados');
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'No hay usuarios registrados',
        message: 'Por favor, registra un usuario.',
        buttons: ['Aceptar'],
      });
      await alert.present();

    }

  }

}
