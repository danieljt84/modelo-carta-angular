import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaSimplesSpComponent } from './carta-simples-sp.component';

describe('CartaSimplesSpComponent', () => {
  let component: CartaSimplesSpComponent;
  let fixture: ComponentFixture<CartaSimplesSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaSimplesSpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaSimplesSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
