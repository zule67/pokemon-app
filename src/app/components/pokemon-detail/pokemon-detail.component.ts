import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

// Import of Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public pokemon: Pokemon | null = null;
  public errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name'); // Get the name from URL
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe({
        next: (data: Pokemon) => {
          this.pokemon = data;
        },
        error: (error: any) => {
          this.errorMessage = error.message;
        }
      });
    }
  }

  // Go back
  goBack(): void {
    this.router.navigate(['/']);
  }
}
