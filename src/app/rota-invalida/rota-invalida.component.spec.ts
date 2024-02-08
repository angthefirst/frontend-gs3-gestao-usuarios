import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaInvalidaComponent } from './rota-invalida.component';

describe('RotaInvalidaComponent', () => {
  let component: RotaInvalidaComponent;
  let fixture: ComponentFixture<RotaInvalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotaInvalidaComponent]
    });
    fixture = TestBed.createComponent(RotaInvalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
