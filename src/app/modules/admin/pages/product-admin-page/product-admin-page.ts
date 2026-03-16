import { ProductDetails } from '@admin/pages/product-admin-page/product-details/product-details';
import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'product-admin-page',
  imports: [ProductDetails],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {

  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)

  productService = inject(ProductsService)

  productId = toSignal(this.activatedRouter.params.pipe(
    map(params => params["id"])
  ))

  productRx = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => {
      return this.productService.getProductById(params.id)
    }
  })

  redirectEffect = effect(() => {
    if (this.productRx.error()) {
      this.router.navigate(['/admin/products'])
    }
  })


}
