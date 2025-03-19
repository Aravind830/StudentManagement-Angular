import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCardComponent } from './students-card.component';

describe('StudentsCardComponent', () => {
  let component: StudentsCardComponent;
  let fixture: ComponentFixture<StudentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
