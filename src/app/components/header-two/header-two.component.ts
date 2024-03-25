import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {
  cartItems: Product[] = [];
  totalPriceInCart: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
    this.cartService.getTotalPrice().subscribe(totalPrice => {
      this.totalPriceInCart = totalPrice;
    })
  }
}
