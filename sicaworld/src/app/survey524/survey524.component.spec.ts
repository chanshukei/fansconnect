import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey524Component } from './survey524.component';

describe('Survey524Component', () => {
  let component: Survey524Component;
  let fixture: ComponentFixture<Survey524Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Survey524Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey524Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
