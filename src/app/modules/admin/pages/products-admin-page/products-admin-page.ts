import { Component, inject, signal } from '@angular/core';
import { ProductTable } from "../components/product-table/product-table";
import { ProductsService } from '@products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {

  pagination = inject(PaginationService)
  productService = inject(ProductsService)
  productPerPage = signal(10)
  
  // productsRx = rxResource({
  //   params: () => ({ page: this.pagination.currentPage() - 1, limit: this.productPerPage() }),
  //   stream: ({ params }) => {
  //     return this.productService.getProducts({
  //       offset: params.page * 9,
  //       limit: params.limit
  //     })
  //   }
  // })



}
