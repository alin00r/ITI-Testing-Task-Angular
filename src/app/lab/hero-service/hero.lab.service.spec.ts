import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { IHero } from '../../models/ihero';

describe("HeroService (HTTP Communication)", () => {
    let service: HeroServiceForLab;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroServiceForLab]
        });
        service = TestBed.inject(HeroServiceForLab);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getHero', () => {
        it("should execute a GET request and return the requested hero by ID", () => {
            const mockHero: IHero = {
                id: 1,
                name: 'Homelander',
                strength: 100
            };

            service.getHero(1).subscribe(hero => {
                expect(hero).toEqual(mockHero);
            });

            const req = httpMock.expectOne('http://localhost:3000/heroes/1');
            expect(req.request.method).toBe('GET');

            req.flush(mockHero);
        });
    });

    describe('updateHero', () => {
        it("should execute a PUT request with the updated hero object in the body", () => {
            const updatedHero: IHero = {
                id: 1,
                name: 'Homelander',
                strength: 200
            };

            service.updateHero(updatedHero).subscribe(hero => {
                expect(hero).toEqual(updatedHero);
            });

            const req = httpMock.expectOne('http://localhost:3000/heroes/1');
            expect(req.request.method).toBe('PUT');
            expect(req.request.body).toEqual(updatedHero);

            req.flush(updatedHero);
        });
    });
});
