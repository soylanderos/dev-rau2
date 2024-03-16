import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../services/Proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  proveedores: any;
  isModalOpen = false;
  isModalOpenAdd = false;
  productSelected: any[] = [];
  idSelected: any;
  editProduct: boolean = false;
  nextId: number = 0;
  productAdd: any = {}; // Objeto para almacenar el nuevo producto
  editedProduct: any = {}; // Variable para almacenar el producto editado temporalmente
  originalProduct: any = {};


  constructor(private proveedorService: ProveedorService) {
    if(!localStorage.getItem('proveedores')){
      this.crearProveedor();
      this.getProveedores();
    }
    else {
      this.getProveedores();
    }
   }

  async ngOnInit() {
    await console.log('ProveedoresPage')
  }

  crearProveedor() {
    //create a list with the providers full
    let proveedores = [
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

    localStorage.setItem('proveedores', JSON.stringify(proveedores));
    console.log('Proveedores creados');
  }

  getProveedores() {
    this.proveedores = this.proveedorService.getProveedores();
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
    this.productSelected = this.proveedores.filter((product: any) => product.id === this.idSelected);
    //regresa el producto seleccionado
    console.log(this.productSelected);

  }
  editProductSelected(product: any) {
    //edita el pdroducto y actualiza usando el servicio de product
    this.proveedorService.updateProveedor(product);
    //cerrar modal
    this.setOpen(false);
    //verifica si se actualizo si no se actualizo entonces deja los cambios anteriores

  }
  // Método para agregar un nuevo producto
  addNewProduct(product: any) {
    // Agregar el producto utilizando el servicio ProductService
    this.proveedorService.addProveedor(product);
    //get products
    this.getProveedores();
    // Cerrar modal
    this.setOpenAdd(false);
  }

  // Método para eliminar un producto
  deleteProduct(id: number) {
    // Eliminar el producto utilizando el servicio ProductService
    this.proveedorService.deleteProveedor(id);
    // Obtener productos
    this.getProveedores();
    // Cerrar modal
    this.setOpen(false);
  }

  getProductByIdSelected(id: number) {
   //abir modal
    this.setOpen(true);
    // Obtener el producto seleccionado
    this.productSelected = this.proveedores.filter((product: any) => product.id === id);
    //regrsar el id seleccionado y imprimir en consola
    this.idSelected = id;
    console.log(this.idSelected);
    this.productSelected = this.proveedores.filter((product: any) => product.id === this.idSelected);
    console.log(this.productSelected);
  }

}
