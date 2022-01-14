import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardGameStartComponent } from './sicard-game-start.component';

describe('SicardGameStartComponent', () => {
  let component: SicardGameStartComponent;
  let fixture: ComponentFixture<SicardGameStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardGameStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
