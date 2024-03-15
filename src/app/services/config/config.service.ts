import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private productsKey = 'config';

  constructor() { }

  // Método para obtener todos los productos
  getConfig(): any[] {
    const productsJson = localStorage.getItem(this.productsKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  // Método para agregar un nuevo producto
  addConfig(product: any) {
    const products = this.getConfig();
    products.push(product);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  // Método para actualizar un producto existente
  updateConfig(updatedProduct: any) {
    const products = this.getConfig();
    const index = products.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    }
  }

  // Método para eliminar un producto
  deleteConfig(productId: number) {
    let products = this.getConfig();
    products = products.filter((product: any) => product.id !== productId);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }
}
