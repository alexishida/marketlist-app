import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the ProductProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: Http) {
  }

  getAll() {
    return this.http.get(`${this.apiUrl}/products`).map(data => {
      return data.json();
    });
  }

  create(product) {
    return this.http.post(`${this.apiUrl}/products`, product).map(data => {
      return data.json();
    });
  }

  update(product) {
    return this.http.put(`${this.apiUrl}/products/${product.id}`, product).map(data => {
      return data.json();
    });
  }

  destroy(product) {
    return this.http.delete(`${this.apiUrl}/products/${product.id}`).map(data => {
      return data.json();
    });
  }

}
