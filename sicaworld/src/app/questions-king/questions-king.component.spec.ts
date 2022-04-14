import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsKingComponent } from './questions-king.component';

describe('QuestionsKingComponent', () => {
  let component: QuestionsKingComponent;
  let fixture: ComponentFixture<QuestionsKingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsKingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsKingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
