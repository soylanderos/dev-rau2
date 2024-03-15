import { Component, OnInit } from '@angular/core';
//importar herramientas
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm: FormGroup;
  isAlertOpen = false;
  alertButtons = ['Action'];

  constructor(public fb:FormBuilder, private alertController: AlertController, private router: Router) {

    this.registroForm = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'conpass': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })

   }

    async ngOnInit() {
      await console.log('Hola');

  }

  async registrar() {
    var f = this.registroForm.value;

    // Validar que los campos estén completos
    if (f.nombre === '' || f.password === '' || f.conpass === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Campos vacíos',
        message: 'Por favor, verifica que todos los campos estén completos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return; // Detener la ejecución del método si los campos están vacíos
    }

    // Validar que las contraseñas sean iguales
    if (f.password !== f.conpass) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Las contraseñas no coinciden',
        message: 'Por favor, verifica que las contraseñas sean iguales.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return; // Detener la ejecución del método si las contraseñas no coinciden
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    };

    // Alerta de usuario registrado correctamente
    const alert = await this.alertController.create({
      header: 'Usuario registrado',
      subHeader: 'Bienvenido',
      message: 'Usuario registrado correctamente.',
      buttons: ['Aceptar'],
    });
    await alert.present();

    // Guardar en el localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}

