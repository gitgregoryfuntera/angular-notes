import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Note } from './../../interfaces/note.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  collection = 'notes';
  noteCollection: AngularFirestoreCollection<Note>
  noteDocument: AngularFirestoreDocument<Note>
  noteID: string;

  constructor(private afs: AngularFirestore) {
    this.noteCollection = this.getAfsQuery(ref=>ref.orderBy('date', 'desc'));
  }

  getAfsQuery(ref) {
    return this.afs.collection<Note>(this.collection, ref)
  }

  getCollection(): Observable<Note[]> {
    return this.noteCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        }))
      );
  }

  getNoteDocument(noteID: string): Observable<Note> {
    this.noteID = noteID;
    this.noteDocument = this.afs.doc(`${this.collection}/${noteID}`);
    return this.noteDocument.valueChanges();
  }

  addNoteDocument(note: any): Promise<any> {
    return this.noteCollection.add(note)
  }

  updateNoteDocument(noteID: string, note: Note): Promise<any> {
    this.noteDocument = this.afs.doc(`${this.collection}/${noteID}`);
    return this.noteDocument.update(note);
  }

  deleteNoteDocument(noteID: string): Promise<any> {
    this.noteDocument = this.afs.doc(`${this.collection}/${noteID}`);
    return this.noteDocument.delete();
  }

  searchNote(noteVal): Observable<Note[]> {
    this.noteCollection = this.getAfsQuery(ref=>ref.where('body', '>=', noteVal)
      .where('body','<=', noteVal+'uf8ff'));
    return this.noteCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
              const data = a.payload.doc.data()
              const id = a.payload.doc.id;
              return {id, ...data}
          })
        )
      );
  }
}
