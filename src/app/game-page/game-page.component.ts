import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RawgService} from "../rawg.service";
import {GameResult} from "../../../game-result.class";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Achievment} from "../../../achievments-result.class";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
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
export class GamePageComponent implements OnInit {
  id = 0;
  trailer = ''
  scrolled = false;
  videoUrl: SafeResourceUrl = ''
  gameDesc = new GameResult();
  ahievments: Achievment[] = [];
  public sanitizer: DomSanitizer;

  constructor(private route: ActivatedRoute, private rawgService: RawgService, sanitizer: DomSanitizer) {
    this.id = this.route.snapshot.params['id'];
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
    let _this = this;
    this.rawgService.GetGameDesc(this.id).then((data: any) => {
      this.gameDesc = data;
    }).then((result: any) => {
        this.rawgService.GetGameTrailer(this.gameDesc.name).then((data: any) => {
          _this.trailer = data.items[0].id.videoId;
          _this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.trailer);
        })
      }
    )
    this.rawgService.GetAchievements(this.id).then((data: any) => {
      _this.ahievments = data.results;
      console.log(_this.ahievments);
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: MouseEvent) {
    this.scrolled = window.scrollY >= 50;
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
}
