import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustSaldoComponent } from './adjust-saldo.component';

describe('AdjustSaldoComponent', () => {
  let component: AdjustSaldoComponent;
  let fixture: ComponentFixture<AdjustSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
