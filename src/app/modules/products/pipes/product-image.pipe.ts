import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;
const placeholderImage = "./assets/images/no-image.jpg"
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): string {

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`
    }

    if (Array.isArray(value)) {
      return `${baseUrl}/files/product/${value[0]}`
    }

    return ""
    // return (value.length > 1) ?
    //   `${baseUrl}/files/product/${value[0]}` :
    //   (value.length === 0) ?
    //     placeholderImage :
    //     `${baseUrl}/files/product/${value}`
  }

}
