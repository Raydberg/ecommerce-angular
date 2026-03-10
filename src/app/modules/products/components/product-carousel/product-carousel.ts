import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe, NgOptimizedImage],
  templateUrl: './product-carousel.html',
  styles: `
  
  .swiper{
    width: 100%;
    height: 500px;
  }
  `
})
export class ProductCarousel implements AfterViewInit {
  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;
    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination],

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  swiperDiv = viewChild.required<ElementRef>("swiperDiv")
  images = input.required<string[]>()




}
