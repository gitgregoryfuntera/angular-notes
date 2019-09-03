import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNotePageComponent } from './pages/create-note-page/create-note-page.component';
import { ShowNotePageComponent } from './pages/show-note-page/show-note-page.component';
import { SearchNotePageComponent } from './pages/search-note-page/search-note-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'show-note/:id', component: ShowNotePageComponent},
  {path: 'create-note/:id', component: CreateNotePageComponent},
  {path: 'search', component: SearchNotePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
