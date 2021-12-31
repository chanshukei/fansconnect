import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckydrawComponent } from './luckydraw.component';

describe('LuckydrawComponent', () => {
  let component: LuckydrawComponent;
  let fixture: ComponentFixture<LuckydrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuckydrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckydrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
