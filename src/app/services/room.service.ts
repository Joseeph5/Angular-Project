import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private url = 'http://localhost:9100/rooms';

  constructor(private http: HttpClient) {}

  getAvailableRooms(
    checkInDate: string,
    checkOutDate: string,
    roomType: string
  ): Observable<any[]> {
    return this.http
      .get<any[]>(this.url + 'all-rooms', {
        params: { checkInDate, checkOutDate, roomType },
      })
      .pipe(map((response) => response));
  }

  getAllRooms(): Observable<any[]> {
    return this.http
      .get<any[]>(this.url + '/all-rooms')
      .pipe(map((response) => response));
  }

  getRoomById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/room/${id}`);
  }

  deleteRoom(roomId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .delete(`${this.url}/room/delete/${roomId}`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting room:', error);
          throw error;
        })
      );
  }

  updateRoom(roomId: string, roomData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.url}/update/${roomId}`, roomData, {
      observe: 'response',
      headers: headers,
    });
  }

  addRoom(
    room: { photo: string; roomType: string; roomPrice: number },
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.url}/add-room`, room, { headers });
  }
}
