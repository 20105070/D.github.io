/*cloud.component.ts - Daniel Syrén (20105070)*/
import { Component } from '@angular/core';
import { HttpService } from '../http_service';
import { University } from '../models/university';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html'
})
export class CloudComponent {

  universities: University[];

  /*constructor(private httpService: HttpService) injects httpService and initialises declared variables.*/
  constructor(private httpService: HttpService) {
    this.universities = [];
  }

  /*delete(name: string) receives name, calls a method of http_service.ts, and reloads saved universities.*/
  delete(name: string) {
    this.httpService.deleteUniversity(name).subscribe(() => {
      this.load();
    });
  }

  /*load() receives universities from http and calls a method of http_service.ts, and assigns the value of universities.*/
  load() {
    this.httpService.getUniversities().subscribe((universities: University[]) => {
      this.universities = universities;
    });
  }

}