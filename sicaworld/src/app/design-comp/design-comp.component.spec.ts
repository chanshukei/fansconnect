import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCompComponent } from './design-comp.component';

describe('DesignCompComponent', () => {
  let component: DesignCompComponent;
  let fixture: ComponentFixture<DesignCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
