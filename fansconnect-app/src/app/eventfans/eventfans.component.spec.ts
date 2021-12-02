import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventfansComponent } from './eventfans.component';

describe('EventfansComponent', () => {
  let component: EventfansComponent;
  let fixture: ComponentFixture<EventfansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventfansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventfansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
