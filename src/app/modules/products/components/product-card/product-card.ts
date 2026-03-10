import { SlicePipe, NgOptimizedImage } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, ProductsResponse } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe, NgOptimizedImage],
  templateUrl: './product-card.html',
})
export class ProductCard {

  product = input.required<Product>()



}
