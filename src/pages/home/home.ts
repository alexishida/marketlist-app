import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Broadcaster} from "ng2-cable/js/index";

import {ProductService} from "../../providers/product.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;
  quantity: number;

  products: any[] = [];

  constructor(public navCtrl: NavController,
              private productService: ProductService,
              private broadcaster: Broadcaster) {
  }

  ionViewDidLoad() {
    this.getProducts();

    this.broadcaster.on('CreateProduct').subscribe(
      product => {
        this.products.push(product);
      }
    );

    this.broadcaster.on('UpdateProduct').subscribe(
      product => {
        this.getProducts();
      }
    );

    this.broadcaster.on('DestroyProduct').subscribe(
      product => {
        this.getProducts();
      }
    );
  }

  create() {
    this.productService.create({name: this.name, quantity: this.quantity}).subscribe(
      produto => console.log(produto)
    );
  }

  update(product) {
    product.found = product.found ? false : true;
    this.productService.update(product).subscribe(
      produto => {}
    );
  }

  destroy(product) {
    this.productService.destroy(product).subscribe(
      produto => {}
    );
  }

  getProducts() {
    this.productService.getAll().subscribe(
      products => this.products = products
    );
  }

}
