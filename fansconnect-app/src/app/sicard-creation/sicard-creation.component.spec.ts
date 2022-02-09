import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardCreationComponent } from './sicard-creation.component';

describe('SicardCreationComponent', () => {
  let component: SicardCreationComponent;
  let fixture: ComponentFixture<SicardCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
