import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, Subject, debounceTime } from 'rxjs';
import { Produit } from './models/produit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  login: string = '';
  password: string = '';

  nom: string = '';
  prenom: string = '';
  cnx: boolean = false;
  produits$: Observable<Array<Produit>>;
  searchString: Subject<string> = new Subject();
  searchString$: Observable<string> = this.searchString.asObservable();
  search: string = '';

  constructor(private apiService: ApiService) {
    this.produits$ = this.apiService.getCalague();
  }
  ngOnInit(): void {
    this.searchString$.pipe(
      debounceTime(1000)
    )
    .subscribe((value) => {
      this.produits$ = this.apiService.searchCatalogue(value);
    }
    );
  }
  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe((c) => {
      this.nom = c.nom;
      this.prenom = c.prenom;
      this.cnx = true;
    });
  }

  updateSearch(value: any) {
    this.searchString.next(value);
  }
}
