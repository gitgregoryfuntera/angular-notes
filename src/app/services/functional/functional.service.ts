import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionalService {

  fullScreen = new Subject<any>();
  drawer = new Subject<any>();

  constructor() { }

  getFullscreenFlag(isFullscreen) {
    this.fullScreen.next(isFullscreen);
  }

  getDrawerFlag(isDrawer) {
    this.drawer.next(isDrawer);
  }

  showFullscreenFlag() {
    return this.fullScreen;
  }

  showDrawerFlag() {
    return this.drawer;
  }
}
