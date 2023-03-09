import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  #url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(private http: HttpClient) {}

  get apiListAllPokemons(): Observable<any> {
    return this.http.get(this.#url).pipe(
      tap((res) => res),
      tap((res: any) => {
        res.results.map((resPokemon: any) => {
          this.apiGetPokemons(resPokemon.url).subscribe(
            (res) => (resPokemon.status = res)
          );
        });
      })
    );
  }

  apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res: any) => res));
  }
}
