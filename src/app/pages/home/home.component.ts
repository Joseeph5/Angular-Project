import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { RoomSearchComponent } from '../../components/room-search/room-search.component';
import { RoomCarouselComponent } from '../../components/room-carousel/room-carousel.component';
import { CustomParalaxComponent } from '../../components/custom-paralax/custom-paralax.component';
import { HotelServiceComponent } from '../../components/hotel-service/hotel-service.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainHeaderComponent,
    RoomSearchComponent,
    RoomCarouselComponent,
    CustomParalaxComponent,
    HotelServiceComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
