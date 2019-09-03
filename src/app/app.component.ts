import { Note } from './interfaces/note.interface';
import { NOTES } from './mocks/notes-list.mock';
import { 
  Component, 
  ViewChild 
} from '@angular/core';
import { FunctionalService } from './services/functional/functional.service';
import { MatSidenav } from '@angular/material';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoteService } from './services/note/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer', {static: false}) public sidenav: MatSidenav;

  isFullscreen = false;
  notes: Observable<Note[]>;
  
  constructor(
    private functionalSvc: FunctionalService,
    private noteSvc: NoteService,
    private router: Router,
    private db: AngularFirestore
  ) {
    // Fullscreen Mode
    this.functionalSvc.showFullscreenFlag()
      .subscribe(res => { 
        this.isFullscreen = res
        if (this.isFullscreen) {
          this.sidenav.close();
        } else {
          this.openDrawer();
        }
    });
    // Search Mode
    this.functionalSvc.showDrawerFlag()
      .subscribe(res => {
        if (res) {
          this.sidenav.close();
        } else {
          this.openDrawer();
        }
    });
    this.notes = this.noteSvc.getCollection();
    // Navigate to Home Page
    // If no notes  has been created
    this.notes.subscribe(res => {
      if(!res.length) {
        this.router.navigate(['home']).then(res => {
          this.isFullscreen = false;
          this.openDrawer();
        });
      }
    });
  }

  openDrawer() {
    this.sidenav.open()
  }

  onDeleteNote(noteID: string) {
    this.noteSvc.deleteNoteDocument(noteID);
  }

  goTo(page) {
    let route =  '/' + page + '/';
    if (page === 'create-note') {
      this.goToCreatePage(route);
    } else {
      this.router.navigate([route]);
    }
  }

  goToCreatePage(route) {
    let note = {
      title: 'Untitled',
      date: new Date(),
      body: ''
    }
    this.noteSvc.addNoteDocument(note).then(res=> {
      route += res.id
      this.router.navigate([route])
    });
  }
}
