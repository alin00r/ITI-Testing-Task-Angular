import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Counter } from "./counter";
import { By } from "@angular/platform-browser";

describe('CounterComponent', () => {
  let fixture: ComponentFixture<Counter>;
  let component: Counter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Counter]
    });

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the component successfully', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial Rendering', () => {
    it('should display an initial counter value of 0', async () => {
      await fixture.whenStable();
      const p = fixture.debugElement.query(By.css("p"));

      expect(p.nativeElement.textContent).toContain("0");
    });
  });

  describe('Counter Actions', () => {
    it('should update the display value correctly after increment and decrement clicks', async () => {
      // Access buttons
      const btnIncrease = fixture.debugElement.query(By.css("#increment"));
      const btnDecrease = fixture.debugElement.query(By.css("#decrement"));

      // Simulate clicks: +3 then -1 = 2
      btnIncrease.triggerEventHandler("click", null);
      btnIncrease.triggerEventHandler("click", null);
      btnIncrease.triggerEventHandler("click", null);

      btnDecrease.triggerEventHandler("click", null);

      fixture.detectChanges();
      await fixture.whenStable();

      const p = fixture.debugElement.query(By.css("p"));

      // Assert state and UI
      expect(component.counter()).toBe(2);
      expect(p.nativeElement.textContent).toContain("2");
    });
  });
});
