import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/product.service';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map } from 'rxjs';

@Component({
  selector: 'home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productsService = inject(ProductsService)
  paginationService = inject(PaginationService)


  // router = inject(ActivatedRoute)
  // currentPage = toSignal(this.router.queryParamMap.pipe(
  //   map(params => (params.get("page") ? +params.get("page")! : 1)),
  //   map(page => (isNaN(page) ? 1 : page))
  // ),
  //   { initialValue: 1 }
  // )

  productResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9
      })
    }
  })




}
