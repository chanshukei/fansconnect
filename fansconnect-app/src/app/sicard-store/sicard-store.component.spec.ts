import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicardStoreComponent } from './sicard-store.component';

describe('SicardStoreComponent', () => {
  let component: SicardStoreComponent;
  let fixture: ComponentFixture<SicardStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicardStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SicardStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
