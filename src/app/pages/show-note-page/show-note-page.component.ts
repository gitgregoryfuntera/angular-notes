import { Note } from './../../interfaces/note.interface';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FunctionalService } from './../../services/functional/functional.service';
import { NOTES } from './../../mocks/notes-list.mock';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-show-note-page',
  templateUrl: './show-note-page.component.html',
  styleUrls: ['./show-note-page.component.scss']
})
export class ShowNotePageComponent implements OnInit {

  note$: Observable<Note>;
  note: Note;
  noteID: string;
  isFullscreen: boolean = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '750px',
    maxHeight: 'auto',
    showToolbar: true,
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functionalSvc: FunctionalService,
    private noteSvc: NoteService,
  ) {  
   this.note$ = this.route.paramMap.pipe(
     switchMap(
       (params: ParamMap) => this.noteSvc.getNoteDocument(params.get('id'))
      )
    )
  }

  ngOnInit() {
    this.functionalSvc.getDrawerFlag(this.isFullscreen);
    this.note$.subscribe(res => {
      this.note = res;
    });
  }

  onDelete() {
    this.noteSvc.deleteNoteDocument(this.noteSvc.noteID);
  }

  onFullscreen() {
    this.isFullscreen =! this.isFullscreen;
    this.functionalSvc.getFullscreenFlag(this.isFullscreen);
  }

  onSave() {
    this.noteSvc.updateNoteDocument(this.noteSvc.noteID, this.note)
  }
}
