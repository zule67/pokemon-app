import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import of Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Need for ngModel
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public pokemons: Pokemon[] = [];
  public searchTerm: string = '';
  public errorMessage: string = '';

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;
      },
      error: (error: any) => {
        this.errorMessage = error.message;
      }
    });
  }

  // Navigate to the detail view of the selected Pokemon.
  viewDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }

  // Getter to filter the list of Pokemon by search term
  get filteredPokemons(): Pokemon[] {
    if (!this.searchTerm) {
      return this.pokemons;
    }
    return this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
