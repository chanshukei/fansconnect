import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardGameHomeComponent } from './sicard-game-home.component';

describe('SicardGameHomeComponent', () => {
  let component: SicardGameHomeComponent;
  let fixture: ComponentFixture<SicardGameHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardGameHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardGameHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
