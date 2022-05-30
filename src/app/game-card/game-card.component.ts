import {Compiler, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Result} from 'result.class';
import {RawgService} from "../rawg.service";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit, OnDestroy {
  @Input()
  game!: Result;
  compressUrl = ''
  isLoading = true;

  constructor(private rawgService: RawgService, private _compiler: Compiler) {
  }

  ngOnInit(): void {
    this.getCompressUrl();
  }

  getCompressUrl() {
    this.rawgService.CompressImg(this.game.background_image, 15).then((data: any) => {
      this.compressUrl = data.dest;
    })
  }

  ngOnDestroy(): void {
    this._compiler.clearCache();
  }

  Loading(img: HTMLImageElement) {
    if (img.complete)
      this.isLoading = false;
  }
}
