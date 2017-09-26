import { ShoppingCart } from "shared/models/shopping-cart";

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
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
  }
}