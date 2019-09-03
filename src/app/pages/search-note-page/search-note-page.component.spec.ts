import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotePageComponent } from './search-note-page.component';

describe('SearchNotePageComponent', () => {
  let component: SearchNotePageComponent;
  let fixture: ComponentFixture<SearchNotePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNotePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
