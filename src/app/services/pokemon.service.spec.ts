import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Check that there are no pending requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPokemonDetails', () => {
    it('should return an Observable<Pokemon> with details for a given Pokémon', () => {
      const PokemonMock: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'url' },
        types: [],
        abilities: []
      };

      service.getPokemonDetails('bulbasaur').subscribe(pokemon => {
        expect(pokemon).toEqual(PokemonMock);
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(req.request.method).toBe('GET');
      req.flush(PokemonMock);
    });

    it('should handle error when getPokemonDetails fails', () => {
      service.getPokemonDetails('bulbasaur').subscribe({
        next: () => fail('expected an error'),
        error: error => {
          expect(error.message).toContain('Error getting the Pokémon details bulbasaur');
        }
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'), { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#getPokemonList', () => {
    it('should return an Observable<Pokemon[]> combining details of each Pokémon', () => {
      // API mock of response for the list
      const listResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      };

      // Pokemon mocks
      const PokemonMock1: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'url1' },
        types: [],
        abilities: []
      };

      const PokemonMock2: Pokemon = {
        id: 2,
        name: 'ivysaur',
        sprites: { front_default: 'url2' },
        types: [],
        abilities: []
      };

      service.getPokemonList().subscribe(pokemons => {
        expect(pokemons.length).toBe(2);
        expect(pokemons).toEqual([PokemonMock1, PokemonMock2]);
      });

      // Request to get the list of pokemon
      const reqList = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
      expect(reqList.request.method).toBe('GET');
      reqList.flush(listResponse);

      // Requests for details of each Pokemon
      const reqDetail1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
      expect(reqDetail1.request.method).toBe('GET');
      reqDetail1.flush(PokemonMock1);

      const reqDetail2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/ivysaur');
      expect(reqDetail2.request.method).toBe('GET');
      reqDetail2.flush(PokemonMock2);
    });

    it('should handle error when getPokemonList fails', () => {
      service.getPokemonList().subscribe({
        next: () => fail('expected an error'),
        error: error => {
          expect(error.message).toContain('Error getting the Pokémon list');
        }
      });

      const reqList = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151');
      expect(reqList.request.method).toBe('GET');
      reqList.error(new ErrorEvent('Network error'), { status: 500, statusText: 'Server Error' });
    });
  });
});
