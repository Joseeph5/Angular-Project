import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomListingComponent } from './pages/room/room-listing/room-listing.component';
import { FindBookingComponent } from './pages/booking/find-booking/find-booking.component';
import { BookRoomComponent } from './pages/booking/book-room/book-room.component';
import { BookingSuccessComponent } from './pages/booking/booking-success/booking-success.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { AdminGuard } from './services/admin.guard';
import { EditRoomComponent } from './pages/admin/edit-room/edit-room.component';
import { ExistingRoomsComponent } from './pages/admin/existing-rooms/existing-rooms.component';
import { ExistingBookingsComponent } from './pages/admin/existing-bookings/existing-bookings.component';
import { AddRoomComponent } from './pages/admin/add-room/add-room.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'browse-all-rooms', component: RoomListingComponent },
  { path: 'find-booking', component: FindBookingComponent },
  { path: 'book-room/:roomId', component: BookRoomComponent },
  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-room/:roomId',
    component: EditRoomComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'existing-rooms',
    component: ExistingRoomsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'existing-bookings',
    component: ExistingBookingsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'add-room',
    component: AddRoomComponent,
    canActivate: [AdminGuard],
  },
];
