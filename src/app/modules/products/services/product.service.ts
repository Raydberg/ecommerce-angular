import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface Options {
    limit?: string,
    offset?: string
    gender?: string
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private http = inject(HttpClient)
    private readonly baseUrl = environment.baseUrl

    getProducts(options: Options): Observable<ProductsResponse> {

        const { limit = 9, gender = "", offset = 0 } = options

        return this.http.get<ProductsResponse>(`${this.baseUrl}/products`, {
            params: {
                limit,
                offset,
                gender
            }
        })
            .pipe(
            // tap(console.log)
        )
    }

    getProductByIdSlug(slug: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${slug}`).pipe(
            
        )
    }

}