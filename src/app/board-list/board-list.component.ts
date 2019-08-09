import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardsService } from '../boards.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  //https://busquedatab-app.firebaseapp.com/__/auth/handler
  public user;
  myControl = new FormControl();

  boards: any[] = [];
  filteredOptions: Observable<any[]>;
  filteredboards: any[] = [];
  favoriteBoards: any[] = [];

  constructor(
    private boardService: BoardsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser();
    this.getBoards();

  }

  getBoards(): void {
    this.boardService.getBoards().subscribe((boards) => {
      this.boards = boards;
      this.filterBoards();

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(text => text ? this._filter(text) : this.boards.slice())
      );
    });
  }

  failure() {
    console.log("Couldn't authenticate successfully.");
  }

  displayFn(board?: any): string | undefined {
    return board ? board.name : undefined;
  }


  private _filter(text: string): any[] {

    const filterValue = text.toLowerCase();
    this.filterBoards();

    return this.boards.filter(board => board.name.toLowerCase().indexOf(filterValue) === 0);

  }

  private filterBoards(): any {

    if (this.myControl.value !== null && this.myControl.value.name) {

      this.filteredboards = this.boards.filter(board => board.name.toLowerCase().indexOf(this.myControl.value.name.toLowerCase()) === 0)
    } else {
      this.filteredboards = this.boards;
    }

    this.getFavBoards();

  }

  dropLeft(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

        this.deleteFavBoard(event.container.data[event.currentIndex]);
    }
  }


  dropRight(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.createFavBoard(event.container.data[event.currentIndex]);
    }

  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = id;

  }

  gotoBoard(url: string) {
    document.location.href = url;

  }

  public getFavBoards() {
    this.boardService.getFavBoards().valueChanges().subscribe(
      (boards) => {
        this.favoriteBoards = boards;
        this.filterFavBoard();
      }
    )
  }

  private filterFavBoard(){

    this.filteredboards =  this.filteredboards.filter( (board)=>{

     const isFav = this.favoriteBoards.findIndex( (favBoard)=>{

         return  favBoard.id == board.id;

       }
       );

       return isFav === -1;
    });
   
  }

  public createFavBoard(board: any) {
    this.boardService.createFavBoard(board).then(
      () => console.log('favorito creado')
    ).catch(
      () => console.log('error al guardar favorito')
    );
  }


  public deleteFavBoard(board: any) {
     this.boardService.deleteFavBoard(board).then(
      () => console.log('favorito eliminado')
    ).catch(
      () => console.log('error al eliminar favorito')
    );
  }


}

