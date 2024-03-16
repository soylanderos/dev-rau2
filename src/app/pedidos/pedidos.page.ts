import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/Pedidos/pedidos.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos: any;
  isModalOpen = false;
  isModalOpenAdd = false;
  productSelected: any[] = [];
  idSelected: any;
  editProduct: boolean = false;
  nextId: number = 0;
  productAdd: any = {}; // Objeto para almacenar el nuevo producto
  editedProduct: any = {}; // Variable para almacenar el producto editado temporalmente
  originalProduct: any = {};


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
        id: 1,
        proveedor: 'The Coca-Cola Company',
        producto: 'Coca Cola',
        cantidad: 3,
        total: 4.50
      },
      {
        id: 2,
        proveedor: 'PepsiCo',
        producto: 'Pepsi',
        cantidad: 2,
        total: 3.00
      },
      {
        id: 3,
        proveedor: 'Grupo Peñafiel',
        producto: 'Peñafiel',
        cantidad: 1,
        total: 1.50
      },
      {
        id: 4,
        proveedor: 'Keurig Dr Pepper',
        producto: 'Dr Pepper',
        cantidad: 4,
        total: 6.00
      },
      {
        id: 5,
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
    console.log(this.pedidos);
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
    this.productSelected = this.pedidos.filter((product: any) => product.id === this.idSelected);
    //regresa el producto seleccionado
    console.log(this.productSelected);

  }
  editProductSelected(product: any) {
    //edita el pdroducto y actualiza usando el servicio de product
    this.pedidosService.updatePedidos(product);
    //cerrar modal
    this.setOpen(false);
    //verifica si se actualizo si no se actualizo entonces deja los cambios anteriores

  }
  // Método para agregar un nuevo producto
  addNewProduct(product: any) {
    // Agregar el producto utilizando el servicio ProductService
    this.pedidosService.addPedidos(product);
    //get products
    this.getPedidos();
    // Cerrar modal
    this.setOpenAdd(false);
  }

  // Método para eliminar un producto
  deleteProduct(id: number) {
    // Eliminar el producto utilizando el servicio ProductService
    this.pedidosService.deletePedidos(id);
    // Obtener productos
    this.getPedidos();
    // Cerrar modal
    this.setOpen(false);
  }

  getProductByIdSelected(id: number) {
   //abir modal
    this.setOpen(true);
    // Obtener el producto seleccionado
    this.productSelected = this.pedidos.filter((product: any) => product.id === id);
    //regrsar el id seleccionado y imprimir en consola
    this.idSelected = id;
    console.log(this.idSelected);
    this.productSelected = this.pedidos.filter((product: any) => product.id === this.idSelected);
    console.log(this.productSelected);
  }


}
