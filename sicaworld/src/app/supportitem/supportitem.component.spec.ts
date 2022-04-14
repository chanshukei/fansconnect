import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportitemComponent } from './supportitem.component';

describe('SupportitemComponent', () => {
  let component: SupportitemComponent;
  let fixture: ComponentFixture<SupportitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
