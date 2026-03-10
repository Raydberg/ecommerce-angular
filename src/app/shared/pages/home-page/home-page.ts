import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/product.service';

@Component({
  selector: 'home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {




  productsService = inject(ProductsService)

  productResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productsService.getProducts({})
    }
  })




}
