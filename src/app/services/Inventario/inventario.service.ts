import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private productsKey = 'inventario';

  constructor() { }

  // Método para obtener todos los productos
  getInventario(): any[] {
    const productsJson = localStorage.getItem(this.productsKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  // Método para agregar un nuevo producto
  addInventario(product: any) {
    const products = this.getInventario();
    products.push(product);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  // Método para actualizar un producto existente
  updateInventario(updatedProduct: any) {
    const products = this.getInventario();
    const index = products.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    }
  }

  // Método para eliminar un producto
  deleteInventario(productId: number) {
    let products = this.getInventario();
    products = products.filter((product: any) => product.id !== productId);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }
}
