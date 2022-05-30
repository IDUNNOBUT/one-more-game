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
  isLoading = true;

  constructor(private rawgService: RawgService, private _compiler: Compiler) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._compiler.clearCache();
  }

  Loading(img: HTMLImageElement) {
    if (img.complete)
      this.isLoading = false;
  }
}
