import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nameUser: any;

  constructor(private router: Router) {
    const usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      this.nameUser = JSON.parse(usuarioString).nombre;
    } else {
      this.nameUser = '';
    }

  }

  goTo(page:string) {
    this.router.navigate([page]);
  }

}
