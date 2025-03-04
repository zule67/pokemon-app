import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { of, throwError } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Definition of the ParamMap mock with structure of ParamMap interface
const ParamMapMock: ParamMap = {
  get: (key: string): string | null => 'bulbasaur',
  has: (key: string): boolean => true,
  getAll: (key: string): string[] => ['bulbasaur'],
  keys: ['name']
};

// Definition of the ActivatedRouteSnapshot mock
const SnapshotMock: ActivatedRouteSnapshot = {
  paramMap: ParamMapMock,
  url: [],
  params: {},
  queryParams: {},
  fragment: '',
  data: {},
  outlet: 'primary',
  component: null,
  routeConfig: null,
  root: {} as ActivatedRouteSnapshot,
  parent: {} as ActivatedRouteSnapshot,
  firstChild: null,
  children: [],
  pathFromRoot: [] as ActivatedRouteSnapshot[],
  toString: () => '',
  title: '',
  queryParamMap: ParamMapMock
};

// Stub for ActivatedRoute using SnapshotMock
const activatedRouteStub: Partial<ActivatedRoute> = {
  snapshot: SnapshotMock
};

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Spy for the service
    const spyService = jasmine.createSpyObj('PokemonService', ['getPokemonDetails']);
    // Spy for the router
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        PokemonDetailComponent,
        RouterTestingModule,
        NoopAnimationsModule, // Import to turn off animations in AM
        MatToolbarModule,
        MatCardModule
      ],
      providers: [
        { provide: PokemonService, useValue: spyService },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: spyRouter }
      ]
    }).compileComponents();

    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve and assign Pokemon details', () => {
    const PokemonMock = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'url' },
      types: [],
      abilities: []
    };
    pokemonServiceSpy.getPokemonDetails.and.returnValue(of(PokemonMock));

    fixture.detectChanges();

    expect(component.pokemon).toEqual(PokemonMock);
  });

  it('should assign an error message if the request fails', () => {
    const errorResponse = new Error('Error in request');
    pokemonServiceSpy.getPokemonDetails.and.returnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(component.errorMessage).toEqual('Error in request');
  });
});
