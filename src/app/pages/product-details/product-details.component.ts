import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProducDetailsComponent implements OnInit {
  cartItems: Product[] = [];
  totalPriceInCart: number = 0;
  product: Product = {
    name: "Lorem Ipsum Skeches sunny dale up ",
    id: 1,
    image: "../../../assets/img/sneaker1.jpeg",
    price: 122566,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
     "when an unknown printer took a galley of type and scrambled it to make a type specimen book. " +
     "It has survived not only five centuries, but also the leap into electronic typesetting, " +
     "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset " +
     "sheets containing Lorem Ipsum passages, and more recently with desktop publishing " +
     "software like Aldus PageMaker including versions of Lorem Ipsum."
  };
  images: string[] = [
    "../../../assets/img/sneaker4.jpeg",
    "../../../assets/img/sneaker3.jpeg",
    "../../../assets/img/sneaker1.jpeg",
    "../../../assets/img/sneaker2.jpeg",
  ];
  slickCarouselConfig = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    dots: false,
    speed: 300,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartProducts().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.updateTotalPrice();
    });
  }

  addToCart(product: Product) {
    this.cartService.saveToCart(product);
    this.updateTotalPrice();
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      if (this.cartItems[index].price === product.price) {
        this.cartService.removeFromCart(product);
      } else {
        this.cartItems[index].price -= product.price;
      }
      this.updateTotalPrice();
    }
  }
  
  updateTotalPrice(): void {
    this.totalPriceInCart = this.cartItems.reduce((total, item) => total + item.price, 0);
    this.cartService.saveTotalPrice(this.totalPriceInCart);
  }

  isTestInCart(product: Product): boolean {
    return this.cartItems.some(item => item.id === product.id);
  }

  getCartItemCount(product: Product): number {
    return this.cartItems.filter(item => item.id === product.id).length;
  }

}
