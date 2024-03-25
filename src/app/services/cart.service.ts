import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartProductSubject = new BehaviorSubject<Product[]>([]);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  /**
   * Saves the product to the cart
   * @param product to save
   */
  saveToCart(product: Product) {
    const currentCart = this.cartProductSubject.getValue();
    const existingProduct = currentCart.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.price += product.price; 
    } else {
      currentCart.push({ ...product }); 
    }
    this.cartProductSubject.next([...currentCart]);
  }  

  /**
   * removes the product from the cart
   * @param product to remove
   */
  removeFromCart(product: Product) {
    const currentCart = this.cartProductSubject.getValue();
    const updatedCart = currentCart.filter(item => item.id !== product.id);
    this.cartProductSubject.next(updatedCart);
  }

  /**
   * gets the product in the cart
   * 
   */
  getCartProducts() {
    return this.cartProductSubject.asObservable();
  }

   /**
   * Saves the total price of product 
   * @param total to save
   */
  saveTotalPrice(total: number) {
    this.totalPriceSubject.next(total)
  }

   /**
   * gets the total price of the product in the cart
   * 
   */
  getTotalPrice() {
    return this.totalPriceSubject.asObservable();
  }
}
