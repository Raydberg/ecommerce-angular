import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;
const placeholderImage = "./assets/images/no-image.jpg"
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): string {

    return (value.length > 1) ?
      `${baseUrl}/files/product/${value[0]}` :
      (value.length === 0) ?
        placeholderImage :
        `${baseUrl}/files/product/${value}`
  }

}
