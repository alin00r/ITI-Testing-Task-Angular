import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from '../message/message.service';
import { HeroService } from './hero.service';

describe('HeroService (Integrated HTTP Testing)', () => {
  let httpTesting: HttpTestingController;
  let messageServiceFake = {
    add: vi.fn() // Using Vitest mock function
  };
  let service: HeroService;
  const heroesUrl = 'http://localhost:3000/heroes';

  const fakeHeroes = [
    { id: 1, name: "Homelander", strength: 100 },
    { id: 10, name: "Black Noir", strength: 80 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MessageService, useValue: messageServiceFake }
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    // Ensure no orphan requests are hanging after each test
    httpTesting.verify();
  });

  describe('getHeroes()', () => {
    it('should retrieve a list of heroes via a GET request', () => {
      // Act
      service.getHeroes().subscribe({
        next: (data) => {
          expect(data.length).toBe(fakeHeroes.length);
          expect(data).toEqual(fakeHeroes);
        }
      });

      // Assert HTTP characteristics
      const testRequest = httpTesting.expectOne(heroesUrl);
      expect(testRequest.request.method).toBe("GET");

      // Respond
      testRequest.flush(fakeHeroes);
    });
  });

  describe('addHero()', () => {
    it('should send a POST request with the hero data in the request body', () => {
      const newHero = fakeHeroes[0];

      // Act
      service.addHero(newHero).subscribe({
        next: (data) => {
          expect(data.name).toBe(newHero.name);
        }
      });

      // Assert HTTP characteristics
      const testRequest = httpTesting.expectOne(heroesUrl);
      expect(testRequest.request.method).toBe("POST");
      expect(testRequest.request.body).toEqual(newHero);

      // Respond
      testRequest.flush(newHero);
    });
  });
});
