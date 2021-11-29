import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotobattleComponent } from './photobattle.component';

describe('PhotobattleComponent', () => {
  let component: PhotobattleComponent;
  let fixture: ComponentFixture<PhotobattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotobattleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotobattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
