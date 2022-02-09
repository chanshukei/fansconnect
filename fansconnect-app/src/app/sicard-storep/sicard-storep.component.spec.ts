import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardStorepComponent } from './sicard-storep.component';

describe('SicardStorepComponent', () => {
  let component: SicardStorepComponent;
  let fixture: ComponentFixture<SicardStorepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardStorepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardStorepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
