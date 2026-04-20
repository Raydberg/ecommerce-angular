import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;
const placeholderImage = "./assets/images/no-image.jpg"
@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): string {
    console.log("PIpe image", value)
    if (Array.isArray(value)) {
      return value[0]
    }

    return ""

  }

}
