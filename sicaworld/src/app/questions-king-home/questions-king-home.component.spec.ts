import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsKingHomeComponent } from './questions-king-home.component';

describe('QuestionsKingHomeComponent', () => {
  let component: QuestionsKingHomeComponent;
  let fixture: ComponentFixture<QuestionsKingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsKingHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsKingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
