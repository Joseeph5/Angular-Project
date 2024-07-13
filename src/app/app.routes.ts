import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomListingComponent } from './pages/room/room-listing/room-listing.component';
import { FindBookingComponent } from './pages/booking/find-booking/find-booking.component';
import { BookRoomComponent } from './pages/booking/book-room/book-room.component';
import { BookingSuccessComponent } from './pages/booking/booking-success/booking-success.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'browse-all-rooms', component: RoomListingComponent },
  { path: 'find-booking', component: FindBookingComponent },
  { path: 'book-room/:roomId', component: BookRoomComponent },
  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'profile', component: ProfileComponent },
];
