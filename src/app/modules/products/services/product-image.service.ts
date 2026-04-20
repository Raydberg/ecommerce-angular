import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BYPASS_AUTH } from '@auth/interceptors/auth.interceptor';
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

  uploadImageInBucket(signedUrl: string, file: File) {
    return this.http.put(signedUrl, file, {
      context: new HttpContext().set(BYPASS_AUTH, true),
      headers: {
        "Content-Type": file.type
      }
    })
  }



}
