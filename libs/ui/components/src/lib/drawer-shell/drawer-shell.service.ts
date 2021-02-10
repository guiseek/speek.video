import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class DrawerShellService {
  private _drawer!: MatDrawer;

  private get drawer(): MatDrawer {
    return this._drawer;
  }

  setDrawer(drawer: MatDrawer) {
    this._drawer = drawer
  }

  open() {
    this.drawer.open()
  }

  close() {
    this.drawer.close()
  }

  toggle() {
    this.drawer.toggle()
  }
}
