import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Clinique } from "../../common/tables/clinique";
import { animal } from "../../common/tables/animal";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getCliniques(): Observable<Clinique[]> {
    return this.http
      .get<Clinique[]>(this.BASE_URL + "/cliniques")
      .pipe(catchError(this.handleError<Clinique[]>("getCliniques")));
  }

  public getClinique(noClinique : string): Observable<Clinique> {
    return this.http
      .get<Clinique>(this.BASE_URL + "/cliniques/" + noClinique)
      .pipe(catchError(this.handleError<Clinique>("getCliniques")));
  }

  public getAnimalsInClinique(noClinique: string): Observable<animal[]> {
    return this.http
      .get<Clinique[]>(this.BASE_URL + "/animaux/" + noClinique)
      .pipe(catchError(this.handleError<Clinique[]>("getCliniques")));
  }

//   public insertHotel(hotel: Hotel): Observable<number> {
//     return this.http
//       .post<number>(this.BASE_URL + "/hotels/insert", hotel)
//       .pipe(catchError(this.handleError<number>("insertHotel")));
//   }

//   public updateHotel(hotel: Hotel): Observable<number> {
//     return this.http
//       .put<number>(this.BASE_URL + "/hotels/update", hotel)
//       .pipe(catchError(this.handleError<number>("updateHotel")));
//   }

//   public deleteHotel(hotelNb: string): Observable<number> {
//     return this.http
//       .post<number>(this.BASE_URL + "/hotels/delete/" + hotelNb, {})
//       .pipe(catchError(this.handleError<number>("deleteHotel")));
//   }

//   public getHotelPKs(): Observable<HotelPK[]> {
//     return this.http
//       .get<HotelPK[]>(this.BASE_URL + "/hotels/hotelNb")
//       .pipe(catchError(this.handleError<HotelPK[]>("getHotelPKs")));
//   }

//   public getRooms(hotelNb: string): Observable<Room[]> {
//     return this.http
//       .get<Room[]>(this.BASE_URL + `/rooms?hotelNb=${hotelNb}`)
//       .pipe(catchError(this.handleError<Room[]>("getRooms")));
//   }

//   public insertRoom(room: Room): Observable<number> {
//     return this.http
//       .post<number>(this.BASE_URL + "/rooms/insert", room)
//       .pipe(catchError(this.handleError<number>("inserHotel")));
//   }

//   public updateRoom(room: Room): Observable<number> {
//     return this.http
//       .put<number>(this.BASE_URL + "/rooms/update", room)
//       .pipe(catchError(this.handleError<number>("updateRoom")));
//   }

//   public deleteRoom(hotelNb: string, roomNb: string): Observable<number> {
//     return this.http
//       .post<number>(this.BASE_URL + `/rooms/delete/${hotelNb}/${roomNb}`, {})
//       .pipe(catchError(this.handleError<number>("deleteRoom")));
//   }

//   public getGuests(hotelNb: string, roomNb: string): Observable<Guest[]> {
//     return this.http
//       .get<Guest[]>(this.BASE_URL + `/guests/${hotelNb}/${roomNb}`)
//       .pipe(catchError(this.handleError<Guest[]>("getGuests")));
//   }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
