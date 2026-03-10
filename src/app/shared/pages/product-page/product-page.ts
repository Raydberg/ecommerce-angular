import { HttpParams } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'product-page',
  imports: [],
  templateUrl: './product-page.html',
})
export class ProductPage {

  productService = inject(ProductsService)
  query: string = inject(ActivatedRoute).snapshot.params["id"]



  productResource = rxResource({
    params: () => ({ id: this.query }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.id)
    }
  })

}
