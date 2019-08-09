import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  token: string = '87521241d1650ee66209ff35849a194ca961ce66f17232c4fdcdbef69a92795b';
  key: string = '06261cafb4248aa4a6b7cdf2d6f50c14';
  boards: Observable<any[]>;

  constructor(
    public http: HttpClient,
    public afDB: AngularFireDatabase
  ) {

  }

  getBoards(): Observable<any[]> {
    const path = `https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`;
    return this.http.get<any>(path);
  }

  public getFavBoards() {
    return this.afDB.list('/boards/');
  }

  public createFavBoard(board: any) {
    return this.afDB.database.ref('/boards/' + board.id).set(board);
  }
  public deleteFavBoard(board: any) {
    return this.afDB.database.ref('/boards/' + board.id).remove();
  }

}
