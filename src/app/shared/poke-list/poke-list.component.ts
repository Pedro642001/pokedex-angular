import { PokeApiService } from './../../service/poke-api.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent {
  @Input()
  inputSearch: any;

  getAllPokemons: any;
  setAllPokemons: any;


  constructor(
    private pokeApiService: PokeApiService
  ){}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      }

    );
  }

  getSearch(value: string) {
    const filter = this.setAllPokemons.filter((pokemon: any) => {
      return !pokemon.name.indexOf(value.toLowerCase())
    })
    this.getAllPokemons = filter
  }
}
