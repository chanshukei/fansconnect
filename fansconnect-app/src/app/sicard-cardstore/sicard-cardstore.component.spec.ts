import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardCardstoreComponent } from './sicard-cardstore.component';

describe('SicardCardstoreComponent', () => {
  let component: SicardCardstoreComponent;
  let fixture: ComponentFixture<SicardCardstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardCardstoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardCardstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
