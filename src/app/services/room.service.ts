import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAvailableRooms(
    checkInDate: string,
    checkOutDate: string,
    roomType: string
  ): Observable<any[]> {
    return this.http
      .get<any[]>(this.url, {
        params: { checkInDate, checkOutDate, roomType },
      })
      .pipe(map((response) => response));
  }

  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(map((response) => response));
  }
}
