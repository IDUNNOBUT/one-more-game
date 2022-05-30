import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RawgService} from "../rawg.service";
import {DarkModeService} from "angular-dark-mode";
import {Observable} from "rxjs";

export interface Result {
  name: string,
  id: number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  dark = false;
  regexp = new RegExp('[^A-z0-9 -:]');
  searchResults: Result[] = [];
  dotsShow = false;

  constructor(private rawgService: RawgService, private changeDetection: ChangeDetectorRef, private darkModeService: DarkModeService) {
  }

  ngOnInit(): void {
  }

  Search(search: string) {
    this.searchResults = []
    this.dotsShow = true;
    this.rawgService.Search(search).then((data: any) => {
      this.searchResults = data.results;
      this.dotsShow = false;
    })
  }

  SetDarkMode() {
    this.darkModeService.toggle();
    this.dark = !this.dark;
  }

  CheckValid($event: KeyboardEvent) {
    if (this.regexp.test($event.key))
      $event.preventDefault();
  }

  GoToGame(id: number) {
    console.log('биба')
    location.href = `/game/${id}`
  }

  GoToStart() {
    location.href = '';
  }
}
