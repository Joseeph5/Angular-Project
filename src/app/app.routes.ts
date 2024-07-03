import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomListingComponent } from './pages/room/room-listing/room-listing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'browse-all-rooms', component: RoomListingComponent },
];
