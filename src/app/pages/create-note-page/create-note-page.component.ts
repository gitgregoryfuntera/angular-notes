import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FunctionalService } from './../../services/functional/functional.service';
import { NOTES } from './../../mocks/notes-list.mock';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/note/note.service';
import { Note } from 'src/app/interfaces/note.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-note-page',
  templateUrl: './create-note-page.component.html',
  styleUrls: ['./create-note-page.component.scss']
})
export class CreateNotePageComponent implements OnInit {
  note$: Observable<Note>;
  note: Note;
  isFullscreen: boolean = true;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '750px',
    maxHeight: 'auto',
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functionalSvc: FunctionalService,
    private noteSvc: NoteService
  ) { 
    this.functionalSvc.getFullscreenFlag(this.isFullscreen);
    this.note$ = this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) => this.noteSvc.getNoteDocument(params.get('id'))
      )
    );
  }

  ngOnInit() {
    this.note$.subscribe(res => {
      this.note = res;
    });
  }

  onDone() {
    // console.log('why')
    this.router.navigate([`show-note/${this.noteSvc.noteID}`]).then(res => {
      this.functionalSvc.getFullscreenFlag(false);
    });
  }

  onCancel() {
    this.noteSvc.deleteNoteDocument(this.noteSvc.noteID).then(res => {
      this.navigatePrep()
    });
  }

  onSave() {
    // console.log(this.note);
    this.noteSvc.updateNoteDocument(this.noteSvc.noteID, this.note);
  }

  navigatePrep() {
    this.noteSvc.getCollection().subscribe(res => {
      console.log(res)
      if (!res.length) {
        this.navigateToHome();
      } else {
        this.navigateToLatestNote(res[0].id);
      }
    });
  }

  navigateToLatestNote(noteID: string) {
    this.router.navigate([`show-note/${noteID}`]).then(res => {
      this.functionalSvc.getFullscreenFlag(false);
    });
  }

  navigateToHome() {
    this.router.navigate([`home`]).then(res => {
      this.functionalSvc.getFullscreenFlag(false);
    });
  }

}
