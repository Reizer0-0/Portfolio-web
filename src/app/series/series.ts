import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FavouritesService } from '../favourites/favourites';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './series.html',
  styleUrls: ['./series.css']
})
export class Series implements OnInit {
  keyWord: string = '';
  productList: any[] = [];
  series: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private favouritesService: FavouritesService   
  ) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any>('https://api.jikan.moe/v4/anime?q=Dragon%20Ball&type')
      .subscribe({
        next: resp => {
          this.series = (resp.data || []).filter(
            (anime: any) => anime.title !== 'Longzhu Xun Youji'
          );
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = 'Failed to load series.';
          this.loading = false;
        }
      });
  }

  getAllData() {
    this.http.get<any>('https://api.jikan.moe/v4/anime')
      .subscribe({
        next: resp => {
          this.productList = resp.data.map((item: any) => this.mapToProduct(item));
        },
        error: err => console.error(err)
      });
  }

  filterData() {
    if (!this.keyWord.trim()) {
      this.getAllData();
    } else {
      this.http.get<any>(`https://api.jikan.moe/v4/anime?q=${this.keyWord}`)
        .subscribe({
          next: resp => {
            this.productList = resp.data.map((item: any) => this.mapToProduct(item));
          },
          error: err => console.error(err)
        });
    }
  }

  private mapToProduct(item: any) {
    return {
      mal_id: item.mal_id,
      image: item.images.jpg.image_url,
      title: item.title,
      genre: item.genres?.map((genre: any) => genre.name).join(', ') || 'Unknown',
      episodes: item.episodes || 'N/A',
      rating: item.score || 'N/A',
      description: item.synopsis?.length > 100
        ? item.synopsis.substring(0, 100) + '...'
        : item.synopsis,
      category: 'Anime',
      price: 'Free'
    };
  }

addToFavorites(anime: any): void {
  const product = this.mapToProduct(anime);  
  this.favouritesService.addToFavourites(product);

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `${product.title} added to Favourites`,
    showConfirmButton: false,
    timer: 1500
  });
}
}