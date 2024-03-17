import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/Pedidos/pedidos.service';
import { ProveedorService } from '../services/Proveedores/proveedores.service';
import { InventarioService } from '../services/Inventario/inventario.service';
import { filter } from 'rxjs/operators';


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
  providers = [
    {
      id: 1,
      company: 'The Coca-Cola Company',
      phone: 123456789,
      email: 'info@coca-colacompany.com',
      address: '123 Coca-Cola Street, Atlanta, GA',
      products: [
        {
          name: 'Coca Cola',
          price: 1.5,
        },
        {
          name: 'Sprite',
          price: 1.5,
        },
        {
          name: 'Fanta',
          price: 1.5,
        }
        ]
    },
    {
      id: 2,
      company: 'PepsiCo',
      phone: 987654321,
      email: 'info@pepsico.com',
      address: '456 Pepsi Avenue, Purchase, NY',
      products: [
        {
          name: 'Pepsi',
          price: 1.5,
        },
        {
          name: '7UP',
          price: 1.5,
        },
        {
          name: 'Gatorade',
          price: 1.5,
        },
        {
          name: 'Mirinda',
          price: 1.5,
        }
    ]
    },
    {
      id: 3,
      company: 'Grupo Peñafiel',
      phone: 555555555,
      email: 'info@grupo-penafiel.com',
      address: '789 Peñafiel Street, Mexico City',
      products: [
        {
          name: 'Peñafiel',
          price: 1.5,
        },
        {
          name: 'Fiji',
          price: 1.5,
        }
      ]
    },
    {
      id: 4,
      company: 'Keurig Dr Pepper',
      phone: 111111111,
      email: 'info@kdp.com',
      address: '101 Dr Pepper Drive, Plano, TX',
      products: [
        {
          name: 'Dr Pepper',
          price: 1.5,
        },
        {
          name: 'Snapple',
          price: 1.5,
        },
        {
          name: 'Clamato',
          price: 1.5,
        }
      ]
    },
    {
      id: 5,
      company: 'Grupo Modelo',
      phone: 222222222,
      email: 'info@grupomodelo.com',
      address: '202 Corona Boulevard, Mexico City',
      products: [
        {
          name: 'Corona',
          price: 1.5,
        },
        {
          name: 'Modelo',
          price: 1.5,
        }
      ]
    }
  ];
  productsByProvider = {};
  products: any;
  selectedProvider: any;
  selectedProduct: any;
  providerProducts: any[] = [];
  price: any;
  total: any;


  constructor(
    private pedidosService: PedidosService,
    private proveedorService: ProveedorService,
    private inventarioService: InventarioService) {
    if(!localStorage.getItem('pedidos')){
      this.crearPedidos();
      this.getPedidos();
      this.getProviders();
      this.getProductsByProvider();

    }
    else {
      this.getProviders();
      this.getPedidos();
      this.getProductsByProvider();

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

  getProviders() {
    this.providers = this.proveedorService.getProveedores();
    console.log(this.providers);

  }

  getProductsByProvider() {
    this.productsByProvider = this.proveedorService.getProveedores();
    console.log(this.productsByProvider);

  }

  selectProvider() {
    // Filtrar los productos del proveedor seleccionado
    const selectedProviderObj = this.providers.find(provider => provider.id === this.selectedProvider);
    if (selectedProviderObj) {
      this.providerProducts = selectedProviderObj.products;
      this.selectedProvider = selectedProviderObj.company;
      this.calcularTotal()
      // Buscar el precio del producto seleccionado utilizando el índice
      const selectedProductIndex = this.selectedProduct;
      if (selectedProductIndex >= 0 && selectedProductIndex < this.providerProducts.length) {
        const selectedProduct = this.providerProducts[selectedProductIndex];
        this.price = selectedProduct.price;
        // Calcular el total basado en la cantidad ingresada y el precio del producto seleccionado
        this.total = this.productAdd.cantidad * this.price;
        this.calcularTotal()
      } else {
        // Si el índice seleccionado está fuera de rango, establecer el precio y el total en cero
        this.price = 0;
        this.total = 0;
        this.calcularTotal()
      }
    } else {
      this.providerProducts = [];
      this.price = 0;
      this.total = 0;
      this.calcularTotal()
    }
}



  calcularTotal() {
    this.total = this.productAdd.cantidad * this.selectedProduct.price;
    console.log(this.total);
  }

  addPedido() {
   //add pedido with selectedProvider, selectedProduct and save in localstorage in pedidos
    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    pedidos.push({
      id: pedidos.length + 1,
      proveedor: this.selectedProvider,
      producto: this.selectedProduct.name,
      cantidad: this.productAdd.cantidad,
      total: this.total
    });
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    this.calcularTotal()
    this.getPedidos();
    //close modal
    this.setOpenAdd(false);



  }




}
