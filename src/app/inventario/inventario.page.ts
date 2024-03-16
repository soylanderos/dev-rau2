import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/Inventario/inventario.service';
import { ConfigService } from '../services/config/config.service';
import { LocalNotificationService } from '../services/notificacion/notificacion.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventarios: any;
  isModalOpen = false;
  isModalOpenAdd = false;
  productSelected: any[] = [];
  idSelected: any;
  editProduct: boolean = false;
  nextId: number = 0;
  productAdd: any = {}; // Objeto para almacenar el nuevo producto
  editedProduct: any = {}; // Variable para almacenar el producto editado temporalmente
  originalProduct: any = {};


  constructor(
    private inventarioService: InventarioService,
    private configService: ConfigService,
    private localNotificationService: LocalNotificationService,
    private alertController: AlertController,
    private modalController: ModalController
    ) {

    //si ya estan creado el inventario no volver a crearlo
    if(!localStorage.getItem('inventario')){
      this.createInventario();
      this.getInventario();
      this.notificarInventarioBajo();

    }
    else {
      this.getInventario();
      this.notificarInventarioBajo();
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
        quantity: 4,
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
        quantity: 5,
        img: 'https://i0.wp.com/creatividadenblanco.com/wp-content/uploads/2017/05/fanta_2017_logo.png?resize=1000%2C867&ssl=1'
      },
      {
        id: 4,
        name: 'Sprite',
        price: 1.5,
        quantity: 3,
        img: 'https://seeklogo.com/images/S/sprite-logo-0FD1748C65-seeklogo.com.png'
      },
      {
        id: 5,
        name: '7up',
        price: 1.5,
        quantity: 2,
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
        quantity: 1,
        img: 'https://seeklogo.com/images/P/pe_and__241_afiel-logo-51B818D361-seeklogo.com.png'
      },
      {
        id: 8,
        name: 'Dr Pepper',
        price: 1.5,
        quantity: 15,
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
        quantity: 30,
        img: 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/dqneuviy/cdb67805-0b5f-4148-8e39-5300c7fdee01.jfif'
      },
    ];
    localStorage.setItem('inventario', JSON.stringify(inventario));
  }

  getInventario(){
    this.inventarios = this.inventarioService.getInventario();
  }


  notificarInventarioBajo() {
    let config: any = this.configService.getConfig(); // Update the type of 'config' to 'any'
    let cantidadMinima = config.cantidadMinima;
    //verificar si la cantiad minima es igual a los productos en el inventario
    //for
    for (let producto of this.inventarios) {
      if(producto.quantity <= cantidadMinima) {
        this.notificar(producto.name);
      }
    }


  }

  notificar(nombreProducto: string) {
    this.localNotificationService.notificar(`El producto ${nombreProducto} tiene un stock bajo.`);
    console.log('Notificación enviada');
    console.log('El producto ' + nombreProducto + ' tiene un stock bajo.');
    //use alert
    this.presentAlert(nombreProducto);
  }

  presentAlert(nombreProducto: string) {
    this.alertController.create({
      header: 'Stock bajo',
      message: `El producto ${nombreProducto} tiene un stock bajo.`,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  openModal() {
    this.isModalOpen = true;
  }

  toggleEdit() {
    this.editProduct = !this.editProduct;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpenAdd(isOpen: boolean) {
    this.isModalOpenAdd = isOpen;
  }

  cancelEdit() {
    // Restaurar los valores originales del producto
    this.editedProduct = { ...this.originalProduct };
    this.setOpen(false);
  }


   openDetails(product: any) {
    //busca el producto seleccionado con this.idSelected en el array de productos
    this.productSelected = this.inventarios.filter((product: any) => product.id === this.idSelected);
    //regresa el producto seleccionado
    console.log(this.productSelected);

  }
  editProductSelected(product: any) {
    //edita el pdroducto y actualiza usando el servicio de product
    this.inventarioService.updateInventario(product);
    //cerrar modal
    this.setOpen(false);
    //verifica si se actualizo si no se actualizo entonces deja los cambios anteriores

  }
  // Método para agregar un nuevo producto
  addNewProduct(product: any) {
    // Agregar el producto utilizando el servicio ProductService
    this.inventarioService.addInventario(product);
    //get products
    this.getInventario();
    // Cerrar modal
    this.setOpenAdd(false);
  }

  // Método para eliminar un producto
  deleteProduct(id: number) {
    // Eliminar el producto utilizando el servicio ProductService
    this.inventarioService.deleteInventario(id);
    // Obtener productos
    this.getInventario();
    // Cerrar modal
    this.setOpen(false);
  }

  getProductByIdSelected(id: number) {
   //abir modal
    this.setOpen(true);
    // Obtener el producto seleccionado
    this.productSelected = this.inventarios.filter((product: any) => product.id === id);
    //regrsar el id seleccionado y imprimir en consola
    this.idSelected = id;
    console.log(this.idSelected);
    this.productSelected = this.inventarios.filter((product: any) => product.id === this.idSelected);
    console.log(this.productSelected);
  }

}
