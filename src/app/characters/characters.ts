import { Component, OnInit } from '@angular/core';
import { DragonballService } from '../services/dragonball';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.html',
  styleUrl: './characters.css'
})
export class Characters {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  filterText: string = '';
  raceFilter: string = '';
  availableRaces: string[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private dbService: DragonballService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(page: number = 1): void {
    this.dbService.getCharacters(page).subscribe(response => {
      this.characters = response.items;
      this.filteredCharacters = [...this.characters];
      this.currentPage = response.meta.currentPage;
      this.totalPages = response.meta.totalPages;

      // Populate unique races **from all loaded characters**
      this.availableRaces = [...new Set(this.characters.map(c => c.race).filter(r => r))];
    });
  }

  applyFilter(): void {
    const text = this.filterText.toLowerCase();

    this.filteredCharacters = this.characters.filter(char => {
      const matchesText =
        char.name.toLowerCase().includes(text) ||
        char.race.toLowerCase().includes(text);

      const matchesRace = this.raceFilter ? char.race === this.raceFilter : true;

      return matchesText && matchesRace;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadCharacters(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1);
    }
  }
}
