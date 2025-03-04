import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    // Spy for the service
    const spy = jasmine.createSpyObj('PokemonService', ['getPokemonList']);

    await TestBed.configureTestingModule({
      imports: [
        PokemonListComponent,
        RouterTestingModule,
        NoopAnimationsModule, // Import to turn off animations in AM
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
      ],
      providers: [
        { provide: PokemonService, useValue: spy }
      ]
    }).compileComponents();

    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the list of Pokemon when data is retrieved', () => {
    // Create a mock
    const PokemonsMock = [
      { id: 1, name: 'bulbasaur', sprites: { front_default: 'url1' }, types: [], abilities: [] }
    ];
    pokemonServiceSpy.getPokemonList.and.returnValue(of(PokemonsMock));

    fixture.detectChanges();

    expect(component.pokemons).toEqual(PokemonsMock);
  });

  it('should assign an error message if the request fails', () => {
    const errorResponse = new Error('Error in request');
    pokemonServiceSpy.getPokemonList.and.returnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(component.errorMessage).toEqual('Error in request');
  });
});
