import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignNewComponent } from './design-new.component';

describe('DesignNewComponent', () => {
  let component: DesignNewComponent;
  let fixture: ComponentFixture<DesignNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
