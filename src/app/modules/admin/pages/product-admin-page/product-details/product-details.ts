import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@core/utils/form.utils';
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { ProductsService } from '@products/services/product.service';
import { Router } from '@angular/router';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { JsonPipe } from '@angular/common';
import { ProductImageService } from '@products/services/product-image.service';
import { from, map, mergeMap, switchMap, tap, toArray } from 'rxjs';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, FormErrorLabel, JsonPipe, NgIcon],
  viewProviders: [provideIcons({
    heroTrash
  })],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<ProductsResponse>()
  router = inject(Router);
  fb = inject(FormBuilder)
  productService = inject(ProductsService)

  imagePreview = signal<string[] | null>([]);
  imagesFiles = signal<File[] | null>([])
  existingImages = signal<string[]>([])
  productImageService = inject(ProductImageService)

  sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  productForm = this.fb.nonNullable.group({
    name: ["", [Validators.required]],
    description: ["", [Validators.required]],
    slug: ["", [Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [['']],
    tags: [''],
    gender: ['MEN', [Validators.required, Validators.pattern(/MEN|WOMEN|KID|UNISEX/)]],
    imageUrl: this.fb.control<string[] | null>(null)
  })
  ngOnInit(): void {
    this.setFormValue(this.product())
    if (this.product().id !== 'new') {
      this.existingImages.set(this.product().images || [])
    }
  }

  setFormValue(formLike: Partial<ProductsResponse>) {
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


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement

    if (!input.files || input.files.length === 0) {
      this.imagePreview.set(null)
      return;
    }
    const file = input.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.update((prev) => [`${reader.result}`, ...(Object.values(prev!))])
    }
    reader.readAsDataURL(file)
    this.imagesFiles.update((prev) => [...(Object.values(prev!)), file])

  }

  onSubmit() {

    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched()
    if (!isValid) return;

    const { imageUrl, tags, ...validProductData } = this.productForm.value
    let normalizedTags: string[] = [];

    if (Array.isArray(tags)) {
      normalizedTags = tags.map(tag => tag.toLowerCase().trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      normalizedTags = tags
        .toLowerCase()
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
    }

    const productLike: Partial<ProductsResponse> = {
      ...validProductData,
      tags: normalizedTags,
    }
    console.log(productLike)

    if (this.product().id === 'new') {
      //Crear
      if (!this.imagesFiles()) return;
      this.productImageService.getSignedUrl(this.imagesFiles()!).pipe(
        // Subida de archivos
        switchMap(signedResponse => from(signedResponse)),
        mergeMap(({ signedUrl, url }, index) => {
          const fileToUpload = this.imagesFiles()![index]
          return this.productImageService.uploadImageInBucket(signedUrl, fileToUpload)
            .pipe(
              map(() => url),
            )
        }),
        toArray(),
        // Enviar a backend producto creado con imagenes
        switchMap((respUpload) => {
          const finalPayload = { ...productLike, images: respUpload }
          return this.productService.createProduct(finalPayload)
        }),
        tap(console.log)
      ).subscribe((product) => {
        console.log(product)
        this.router.navigate(['/admin/products', product.id])
      })
    } else {

      if (this.imagesFiles()!.length > 0) {
        // El usuario añadio nuevas imagenes
        if (!this.imagesFiles()) return;
        this.productImageService.getSignedUrl(this.imagesFiles()!).pipe(
          // Subida de archivos
          switchMap(signedResponse => from(signedResponse)),
          mergeMap(({ signedUrl, url }, index) => {
            const fileToUpload = this.imagesFiles()![index]
            return this.productImageService.uploadImageInBucket(signedUrl, fileToUpload)
              .pipe(
                map(() => url),
              )
          }),
          toArray(),
          // Enviar a backend producto creado con imagenes
          switchMap((respUpload) => {
            const finalImages = [...this.existingImages(), ...respUpload]
            const finalPayload = { ...productLike, images: finalImages }
            return this.productService.updateProduct(this.product().id, finalPayload)
          }),
        ).subscribe((product) => {
          console.log(product)
          this.router.navigate(['/admin/products', product.id])
        })


      } else {
        // El usuario solo edito texto o borro imagenes , pero no sube nuevas
        const finalPayload = { ...productLike, images: this.existingImages() }
        this.productService.updateProduct(this.product().id, finalPayload).subscribe(
          product => console.log("Producto actualizado")
        )
      }

    }

  }


  removeNewImage(index: number) {
    this.imagesFiles.update(files => files!.filter((_, i) => i !== index))
    this.imagePreview.update(previews => previews!.filter((_, i) => i !== index))
  }


}
