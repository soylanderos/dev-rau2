import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private productsKey = 'pedidos';

  constructor() { }

  // Método para obtener todos los productos
  getPedidos(): any[] {
    const productsJson = localStorage.getItem(this.productsKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  // Método para agregar un nuevo producto
  addPedidos(product: any) {
    const products = this.getPedidos();
    products.push(product);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  // Método para actualizar un producto existente
  updatePedidos(updatedProduct: any) {
    const products = this.getPedidos();
    const index = products.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    }
  }

  // Método para eliminar un producto
  deletePedidos(productId: number) {
    let products = this.getPedidos();
    products = products.filter((product: any) => product.id !== productId);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }
}
