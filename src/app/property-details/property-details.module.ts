import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailsRoutingModule } from './property-details-routing.module';
import { PropertyDetailsComponent } from './property-details.component';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    PropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    PropertyDetailsRoutingModule,
    GalleriaModule
  ]
})
export class PropertyDetailsModule { }
