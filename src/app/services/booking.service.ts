import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:9100/bookings'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  bookRoom(roomId: string, booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/room/${roomId}`, booking, {
      responseType: 'text' as 'json',
    });
  }

  getBookingByConfirmationCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/confirmation/${code}`);
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
