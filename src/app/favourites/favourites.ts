import { Component, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private favourites: any[] = [];

  getFavourites() {
    return this.favourites;
  }

  addToFavourites(item: any) {
    if (!this.favourites.some(f => f.mal_id === item.mal_id)) {
      this.favourites.push(item);
    }
  }

  removeFromFavourites(id: any) {
    this.favourites = this.favourites.filter(fav => fav.mal_id !== id);
  }
}

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.html',
  styleUrls: ['./favourites.css']
})
export class Favourites implements OnInit {
  favourites: any[] = [];

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites(): void {
    this.favourites = this.favouritesService.getFavourites();
  }

  removeFromFavourites(id: any): void {
    this.favouritesService.removeFromFavourites(id);
    this.loadFavourites();
  }
}
