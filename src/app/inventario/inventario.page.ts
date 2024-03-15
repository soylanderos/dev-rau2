import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/Inventario/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventarios: any;

  constructor(private inventarioService: InventarioService) {
    //si ya estan creado el inventario no volver a crearlo
    if(!localStorage.getItem('inventario')){
      this.createInventario();
      this.getInventario();
    }
    else {
      this.getInventario();
    }
  }

  async ngOnInit() {
    await console.log('InventarioPage');
  }

  createInventario(){
    let inventario = [
      {
        id: 1,
        name: 'Coca Cola',
        price: 1.5,
        quantity: 10,
        img: 'https://ams3.digitaloceanspaces.com/graffica/2023/02/cocacola-logo.jpeg'
      },
      {
        id: 2,
        name: 'Pepsi',
        price: 1.5,
        quantity: 10,
        img: 'https://thumbs.dreamstime.com/b/logotipo-vectorial-pepsi-logo-de-cola-con-fondo-azul-ilustraci%C3%B3n-archivo-pasos-editable-disponible-178901837.jpg'
      },
      {
        id: 3,
        name: 'Fanta',
        price: 1.5,
        quantity: 10,
        img: 'https://i0.wp.com/creatividadenblanco.com/wp-content/uploads/2017/05/fanta_2017_logo.png?resize=1000%2C867&ssl=1'
      },
      {
        id: 4,
        name: 'Sprite',
        price: 1.5,
        quantity: 10,
        img: 'https://seeklogo.com/images/S/sprite-logo-0FD1748C65-seeklogo.com.png'
      },
      {
        id: 5,
        name: '7up',
        price: 1.5,
        quantity: 10,
        img: 'https://i.pinimg.com/736x/ee/c5/78/eec578cc7d43cd51da3407f29acee0a3.jpg'
      },
      {
        id: 6,
        name: 'Mirinda',
        price: 1.5,
        quantity: 10,
        img: 'https://cdn.freebiesupply.com/logos/large/2x/mirinda-logo-png-transparent.png'
      },
      {
        id: 7,
        name: 'Peñafiel',
        price: 1.5,
        quantity: 10,
        img: 'https://seeklogo.com/images/P/pe_and__241_afiel-logo-51B818D361-seeklogo.com.png'
      },
      {
        id: 8,
        name: 'Dr Pepper',
        price: 1.5,
        quantity: 10,
        img: 'https://m.media-amazon.com/images/I/41cqZ0ygiIL._AC_SY580_.jpg'
      },
      {
        id: 9,
        name: 'Boss',
        price: 1.5,
        quantity: 10,
        img: 'https://www.full-trading.com/images/logo_fiji.jpg'
      },
      {
        id: 10,
        name: 'Corona',
        price: 1.5,
        quantity: 10,
        img: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/dqneuviy/cdb67805-0b5f-4148-8e39-5300c7fdee01.jfif'
      },
    ];
    localStorage.setItem('inventario', JSON.stringify(inventario));
  }


  getInventario() {
    this.inventarios = this.inventarioService.getInventario();
  }

}
