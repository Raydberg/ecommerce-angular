import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface ImageMetadata {
  type: string;
}

export interface SignedUrlResponse {
  signedUrl: string;
  url: string;
  metadata: ImageMetadata
}

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private http = inject(HttpClient)
  private readonly BASE_URL = environment.baseUrl


  getSignedUrl(imagesFiles: File[]) {
    const imageMetadata: ImageMetadata[] = imagesFiles.map(file => ({
      type: file.type
    }))
    console.log("Metadata", imageMetadata)
    return this.http.post<SignedUrlResponse[]>(`${this.BASE_URL}/products/signed-url`, {
      imageMetadata
    })
  }

  uploadImageInBucket(signedUrl: string, imageType: File['type']) {
    return this.http.put(signedUrl, imageType, {
      headers: {
        "Content-Type": imageType
      }
    })
  }



}
