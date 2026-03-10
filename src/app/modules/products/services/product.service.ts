import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface Options {
    limit?: string,
    offset?: number
    gender?: string
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private http = inject(HttpClient)
    private productsCache = new Map<string, ProductsResponse>()
    private readonly baseUrl = environment.baseUrl

    getProducts(options: Options): Observable<ProductsResponse> {


        const { limit = 9, gender = "", offset = 0 } = options

        const key = `${limit}-${offset}-${gender}`
        if (this.productsCache.has(key)) {
            return of(this.productsCache.get(key)!)
        }



        return this.http.get<ProductsResponse>(`${this.baseUrl}/products`, {
            params: {
                limit,
                offset,
                gender
            }
        })
            .pipe(
                tap(console.log),
                tap(resp => this.productsCache.set(key, resp))
            )
    }

    getProductByIdSlug(slug: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${slug}`).pipe(

        )
    }


}