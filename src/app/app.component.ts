import { Component } from '@angular/core';
import {Router} from '@angular/router'; //or updated version


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modelo-carta';

  constructor(private router: Router){}

  navigateTo(value) {
    if (value) {
        this.router.navigate([value]);
    }
    return false;
}
}
