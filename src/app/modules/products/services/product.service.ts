import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { CreateProduct } from '@core/interfaces/create-product.interface';
import { PaginateResponse } from '@core/interfaces/http-response.interface';
import { Gender, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface Options {
  limit?: number,
  offset?: number
  gender?: string
}


const emptyProduct: ProductsResponse = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient)
  // |    private readonly productsCache = new Map<string, ProductsResponse>()
  private readonly baseUrl = environment.baseUrl

  getProducts(options: Options): Observable<PaginateResponse<ProductsResponse>> {


    const { limit = 9, gender = "", offset = 0 } = options

    // const key = `${limit}-${offset}-${gender}`
    // if (this.productsCache.has(key)) {
    //     return of(this.productsCache.get(key)!)
    // }



    return this.http.get<PaginateResponse<ProductsResponse>>(`${this.baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    })
    // .pipe(
    //   tap(console.log),
    //   tap(resp => this.productsCache.set(key, resp))
    // )
  }

  getProductByIdSlug(slug: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/products/${slug}`).pipe(

    )
  }

  getProductById(id: string): Observable<ProductsResponse> {
    if (id === 'new') return of(emptyProduct);
    return this.http.get<ProductsResponse>(`${this.baseUrl}/products/${id}`)
  }


  updateProduct(id: string, productLike: Partial<ProductsResponse>): Observable<ProductsResponse> {
    return this.http.patch<ProductsResponse>(`${this.baseUrl}/products/${id}`, productLike)
  }

  createProduct(productLike: Partial<ProductsResponse>): Observable<ProductsResponse> {
    return this.http.post<ProductsResponse>(`${this.baseUrl}/products`, productLike)
  }
  createProduct2(newProduct: CreateProduct) {
    return this.http.post(`${this.baseUrl}/products`, newProduct)
  }

}
