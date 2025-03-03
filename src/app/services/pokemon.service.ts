import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // URL of Pokemon API
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  // Method to get the list of Pokémon (151 - I Generation)
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<{ results: Array<{ name: string, url: string }> }>(`${this.baseUrl}?limit=151`).pipe(
      switchMap(response => {
        // For each Pokémon,its details are requested.
        const detailRequests = response.results.map(pokemon => this.getPokemonDetails(pokemon.name));
        return forkJoin(detailRequests);
      }),
      catchError(error => {
        console.error('Error getting the Pokémon list:', error);
        return throwError(() => new Error('Error getting the Pokémon list'));
      })
    );
  }

  // Method to get details of a Pokémon by its name
  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${name}`).pipe(
      catchError(error => {
        console.error(`Error getting the Pokémon details ${name}:`, error);
        return throwError(() => new Error(`Error getting the Pokémon details ${name}`));
      })
    );
  }
}
