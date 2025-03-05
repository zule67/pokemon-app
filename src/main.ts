import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

// Import of standalone component
import { PokemonListComponent } from './app/components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './app/components/pokemon-detail/pokemon-detail.component';


// Routes for application
const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },
  /**
   * {
        path: 'pokemon/:name',
        loadComponent: () => import('./app/components/pokemon-detail/pokemon-detail.component')
                                .then(m => m.PokemonDetailComponent)
      }
   */
  { path: '**', redirectTo: '' }
];

// Start the application using the standalone component and configuring the routing
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // provider for HttpClient
    provideAnimations() // animations are enabled
  ]
})
.catch(err => console.error(err));
