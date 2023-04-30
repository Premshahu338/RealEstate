import { Component } from '@angular/core';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {

  images: any = [];
    
responsiveOptions: any = [];

constructor() {}





ngOnInit() {
   this.getImages().then((images:any) => (this.images = images));
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
}

getData() {
  return [
      {
          itemImageSrc:'assets/images/home-17.jpg',
          thumbnailImageSrc: 'assets/images/home-17.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc:'assets/images/home-15.jpg',
          thumbnailImageSrc: 'assets/images/home-15.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc:'assets/images/home-1.jpg',
          thumbnailImageSrc: 'assets/images/home-1.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc:'assets/images/home-2.jpg',
          thumbnailImageSrc: 'assets/images/home-2.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc:'assets/images/home-3.jpg',
          thumbnailImageSrc: 'assets/images/home-3.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      }
  ];
}

getImages() {
  return Promise.resolve(this.getData());
}

}
