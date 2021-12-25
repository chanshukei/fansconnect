import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmaterialComponent } from './smaterial.component';

describe('SmaterialComponent', () => {
  let component: SmaterialComponent;
  let fixture: ComponentFixture<SmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
