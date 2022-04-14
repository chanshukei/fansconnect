import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportItemFormComponent } from './support-item-form.component';

describe('SupportItemFormComponent', () => {
  let component: SupportItemFormComponent;
  let fixture: ComponentFixture<SupportItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
