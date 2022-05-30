import {Component, HostListener, OnInit} from '@angular/core';
import {RawgService} from "../rawg.service";
import {Result} from 'result.class';
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  animations: [
    trigger('removeScrollButton', [
      transition(':leave', [
        animate('1s', keyframes([
          style({transform: 'translateX(0)'}),
          style({transform: 'translateX(1000px)', opacity: 0})
        ]))
      ]),
      transition(':enter', [
        animate('1s', keyframes([
          style({transform: 'translateX(1000px)', opacity: 0}),
          style({transform: 'translateX(0)', opacity: 1})
        ]))
      ])
    ]),
  ]
})
export class InfiniteScrollComponent implements OnInit {
  orderBy = 'metacritic';
  InfiniteItems: Result[] = []
  page = 1;
  load = false;
  scrolled = false;

  constructor(private rawgService: RawgService) {
  }

  ngOnInit(): void {
    this.initList()
  }

  initList() {
    this.load = true;
    this.page = 1;
    this.InfiniteItems = [];
    this.rawgService.GetGameList(this.orderBy).then((data: any) => {
      this.InfiniteItems.push.apply(this.InfiniteItems, data.results);
      this.load = false;
    })
    this.page++
  }

  onScrollDown() {
    this.load = true;
    this.rawgService.GetGameList(this.orderBy, this.page).then((data: any) => {
      this.InfiniteItems.push.apply(this.InfiniteItems, data.results);
      this.load = false;
    })
    this.page++
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: MouseEvent) {
    this.scrolled = window.scrollY >= 100;
  }

  showPreview($event: MouseEvent) {
    if (event) {
      (event.currentTarget as HTMLElement).classList.add('show_preview')
    }
  }

  HidePreview() {
    document.querySelector('.show_preview')!.classList.remove('show_preview')
  }
}
