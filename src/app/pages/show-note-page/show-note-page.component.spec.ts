import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNotePageComponent } from './show-note-page.component';

describe('ShowNotePageComponent', () => {
  let component: ShowNotePageComponent;
  let fixture: ComponentFixture<ShowNotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
