import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private productsKey = 'proveedores';

  constructor() { }

  // Método para obtener todos los productos
  getProveedores(): any[] {
    const productsJson = localStorage.getItem(this.productsKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  // Método para agregar un nuevo producto
  addProveedor(product: any) {
    const products = this.getProveedores();
    products.push(product);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  // Método para actualizar un producto existente
  updateProveedor(updatedProduct: any) {
    const products = this.getProveedores();
    const index = products.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    }
  }

  // Método para eliminar un producto
  deleteProveedor(productId: number) {
    let products = this.getProveedores();
    products = products.filter((product: any) => product.id !== productId);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }
}
