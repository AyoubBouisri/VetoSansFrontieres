import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Clinique } from "../../common/tables/clinique";
import { animal } from "../../common/tables/animal";
import {Facture} from '../../common/tables/facture'
import { Proprietaire } from "../../common/tables/proprietaire";
import { Traitement } from "../../common/tables/traitement";


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

  public getCliniqueProprietaires(noClinique: string): Observable<Proprietaire[]> {
    return this.http
      .get<Proprietaire[]>(this.BASE_URL + "/proprietaires/" + noClinique )
      .pipe(catchError(this.handleError<Proprietaire[]>("getCliniqueProprietaires")));
  }

  public getAnimal(animalId : string) : Observable<animal> {
    return this.http
      .get<animal>(this.BASE_URL + "/animal/" + animalId)
      .pipe(catchError(this.handleError<animal>("getAnimalsInClinique")));
  }

  public getAnimalsInClinique(noClinique: string): Observable<animal[]> {
    return this.http
      .get<animal[]>(this.BASE_URL + "/animaux/" + noClinique)
      .pipe(catchError(this.handleError<animal[]>("getAnimalsInClinique")));
  }

  public deleteAnimal(noAnimal:number) : Observable<void> {
    return this.http
      .post<void>(this.BASE_URL + "/animaux/delete/" + noAnimal, {})
      .pipe(catchError(this.handleError<void>("deleteAnimal")));
  }

  public addAnimal(animal: animal) : Observable<number>{
    return this.http
    .post<number>(this.BASE_URL + "/animaux/insert/", animal)
    .pipe(catchError(this.handleError<number>("addAnimal")));
  }

  public getAnimalsFromQuery(noClinique: string, queryText:string) : Observable<animal[]> {
    return this.http
      .get<animal[]>(this.BASE_URL + "/animaux/" + noClinique + '/' + queryText)
      .pipe(catchError(this.handleError<animal[]>("getAnimalsFromQuery")));
  }

  public getFacture(noAnimal: string) : Observable<Facture> {
    return this.http
    .get<Facture>(this.BASE_URL + "/facture/" + noAnimal)
    .pipe(catchError(this.handleError<Facture>("getFacture")));
  }

  public updateAnimal(animal: animal) : Observable<number>{
    return this.http
    .post<number>(this.BASE_URL + "/animal/update/", animal)
    .pipe(catchError(this.handleError<number>("updateAnimal")));
  }

  public getTraitements(animalId : string)  : Observable<Traitement[]>{
    return this.http
    .get<Traitement[]>(this.BASE_URL + "/traitements/" + animalId)
    .pipe(catchError(this.handleError<Traitement[]>("getTraitements")));
  }

  public getExamens(animalId : string)  : Observable<Traitement[]>{
    return this.http
    .get<Traitement[]>(this.BASE_URL + "/examens/" + animalId)
    .pipe(catchError(this.handleError<Traitement[]>("getTraitements")));
  }


  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
