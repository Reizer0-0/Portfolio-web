import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Transformation {
  name: string;
  description?: string;
  image: string;
}

interface Character {
  id: number;
  name: string;
  transformations: Transformation[];
}

@Component({
  selector: 'app-transformations',
  standalone: false,
  templateUrl: './transformations.html',
  styleUrl: './transformations.css'
})
export class Transformations {

 characters: Character[] = []; 
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

ngOnInit() {
    this.loading = true;

    // Step 1: Get character summaries
    this.http.get<any>('https://dragonball-api.com/api/characters?limit=1000').subscribe({
      next: async (response) => {
        const summaries = response.items || [];

        // Step 2: Fetch full details for each character
        const characterPromises = summaries.map((char: any) =>
          this.http.get<Character>(`https://dragonball-api.com/api/characters/${char.id}`).toPromise()
        );

        try {
          const fullCharacters = await Promise.all(characterPromises);

          this.characters = fullCharacters.filter(
            (char) => Array.isArray(char.transformations) && char.transformations.length > 0
          );

          this.loading = false;
        } catch (err) {
          this.error = 'Failed to load character details.';
          this.loading = false;
          console.error('Details API error:', err);
        }
      },
      error: (err) => {
        this.error = 'Failed to load character list.';
        this.loading = false;
        console.error('List API error:', err);
      }
    });
  }
}