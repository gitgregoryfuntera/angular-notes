import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatDividerModule,
  MatGridListModule,
  MatInputModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule
  ]
})
export class AppMaterialModule { }
