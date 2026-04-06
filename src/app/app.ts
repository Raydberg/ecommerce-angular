import { JsonPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductImageService } from '@products/services/product-image.service';
import { ProductsService } from '@products/services/product.service';
import { concatMap, from, map, mergeMap, switchMap, tap, toArray } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe],
  template: `<router-outlet />`

})
export class App {

  imagePreview = signal<string[] | null>([]);
  imagesFiles = signal<File[] | null>([])
  productImageService = inject(ProductImageService)
  productService = inject(ProductsService)

  fb = inject(FormBuilder)


  productForm = this.fb.group({
    imagesFiles: this.fb.control<File[] | null>(null, [Validators.required]),
    imageUrl: this.fb.control<string[] | null>(null)
  })


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
    this.productForm.patchValue({
      imagesFiles: this.imagesFiles()
    })
  }


  onSubmit() {
    const isValid = this.productForm.valid
    this.productForm.markAllAsTouched()
    if (!isValid) return;
    if (!this.productForm.value.imagesFiles) return;
    this.productImageService.getSignedUrl(this.productForm.value.imagesFiles).pipe(
      switchMap(signedResponse => from(signedResponse)),
      mergeMap(({ metadata, signedUrl, url }) => {
        return this.productImageService.uploadImageInBucket(signedUrl, metadata.type)
          .pipe(
            map(() => url),
          )
      }),
      toArray(),
      switchMap((respUpload, index) => {
        return this.productService.createProduct2({
          name: `Product - ${index + 1}`,
          sizes: ['XS'],
          gender: 'MEN',
          images: respUpload
        })
      }),
      tap(console.log)
    ).subscribe({
      next: () => console.log("Ok")
    })
  }




}
