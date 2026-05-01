import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Hero } from "./hero";
import { By } from "@angular/platform-browser";

describe('HeroComponent', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Hero]
    });

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
  });

  it('should initialize the component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('Template Rendering', () => {
    it('should display hero details correctly when a hero object is provided', async () => {
      // Arrange
      component.hero = { id: 10, name: "homelander", strength: 20 };

      // Act
      fixture.detectChanges();
      await fixture.whenStable();

      // Assert
      const span = fixture.debugElement.query(By.css(".badge"));
      const div = fixture.nativeElement.querySelector("div");

      expect(span.nativeElement.textContent).toBe("10");
      expect(div.textContent).toContain("homelander");
    });
  });
});
