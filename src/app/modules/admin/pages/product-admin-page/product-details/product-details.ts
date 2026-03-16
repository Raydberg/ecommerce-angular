import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@core/utils/form.utils';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { ProductsService } from '@products/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>()
  router = inject(Router);
  fb = inject(FormBuilder)
  productService = inject(ProductsService)



  sizes = ["XS", "S", "M", "L", "XL", "XXL"]


  productForm = this.fb.group({
    title: ["", [Validators.required]],
    description: ["", [Validators.required]],
    slug: ["", [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [['']],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  })
  ngOnInit(): void {
    this.setFormValue(this.product())
  }

  setFormValue(formLike: Partial<Product>) {
    // this.productForm.reset(formLike as any)
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(",") } as any)

  }

  onSizeChange(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1)
    } else {
      currentSizes.push(size)
    }
    this.productForm.patchValue({ sizes: currentSizes })
  }

  onSubmit() {

    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched()
    if (!isValid) return;

    const formValue = this.productForm.value
    const tagsValue = formValue.tags;
    let normalizedTags: string[] = [];

    if (Array.isArray(tagsValue)) {
      normalizedTags = tagsValue.map(tag => tag.toLowerCase().trim()).filter(Boolean);
    } else if (typeof tagsValue === 'string') {
      normalizedTags = tagsValue
        .toLowerCase()
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
    }

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: normalizedTags
    }
    console.log(productLike)

    if (this.product().id === 'new') {
      //Crear

      this.productService.createProduct(productLike).subscribe((product) => {

        console.log("Producto Creado")
        this.router.navigate(['/admin/products', product.id])
      })
    } else {
      this.productService.updateProduct(this.product().id, productLike).subscribe(
        product => console.log("Producto actualizado")
      )
    }

  }


}
