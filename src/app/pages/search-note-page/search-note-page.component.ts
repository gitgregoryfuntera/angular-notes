import { NOTES } from './../../mocks/notes-list.mock';
import { FunctionalService } from './../../services/functional/functional.service';
import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';



@Component({
  selector: 'app-search-note-page',
  templateUrl: './search-note-page.component.html',
  styleUrls: ['./search-note-page.component.scss']
})
export class SearchNotePageComponent implements OnInit {

  notes: Note[];
  constructor(
    private functionalSvc: FunctionalService,
    private noteSvc: NoteService) { }

  ngOnInit() {
    this.functionalSvc.getDrawerFlag(true);
  }

  onSearch(searchVal) {
    if (searchVal) {
      this.noteSvc.getCollection().subscribe(res => {
        this.notes = res.filter(notes => notes.body.toLowerCase().includes(searchVal.toLowerCase()));
      });
    } else {
      this.notes = [];
    }

  }

}
