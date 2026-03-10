import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/product.service';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { I18nSelectPipe, TitleCasePipe } from '@angular/common';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'gender-page',
  imports: [ProductCard, I18nSelectPipe, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  route = inject(ActivatedRoute)

  paginationService = inject(PaginationService)
  productService = inject(ProductsService)
  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  )

  genderMap = {
    women: "Mujeres",
    men: "Hombres",
    kids: "Niños"
  }



  productRx = rxResource({
    params: () => ({ gender: this.gender(), currentPage: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        gender: params.gender,
        offset: params.currentPage
      })
    }
  })


}
