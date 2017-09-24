import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'app/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { OrderService } from 'app/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnDestroy { 
  shipping = {}; 
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map( i => {
        return {
          product: {
            title: i.title,
            imageUrll: i.imageUrl,
            price: i.price
          },
          quanity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };

    this.orderService.storeOrder(order);
  }    
}
