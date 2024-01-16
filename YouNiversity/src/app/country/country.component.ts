/*country.component.ts - Daniel Syrén (20105070)*/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service';
import { University } from '../models/university';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit {

  countries: string[];
  country: string;
  country1: string;
  country2: string;
  country3: string;
  country4: string;
  container: string;
  displayCountries: boolean;
  universities: University[];

  /*constructor(private httpService: HttpService) injects httpService and initialises declared variables.*/
  constructor(private httpService: HttpService) {
    /*https://css-tricks.com/snippets/javascript/array-of-country-names/*/
    this.countries = ["afghanistan", "albania", "algeria", "andorra", "angola", "anguilla", "antigua & barbuda", "argentina", "armenia", "aruba", "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bermuda", "bhutan", "bolivia", "bosnia & herzegovina", "botswana", "brazil", "british virgin islands", "brunei", "bulgaria", "burkina faso", "burundi", "cambodia", "cameroon", "cape verde", "cayman islands", "chad", "chile", "china", "colombia", "congo", "cook islands", "costa rica", "cote d ivoire", "croatia", "cruise ship", "cuba", "cyprus", "czech republic", "denmark", "djibouti", "dominica", "dominican republic", "ecuador", "egypt", "el salvador", "equatorial guinea", "estonia", "ethiopia", "falkland islands", "faroe islands", "fiji", "finland", "france", "french polynesia", "french west indies", "gabon", "gambia", "georgia", "germany", "ghana", "gibraltar", "greece", "greenland", "grenada", "guam", "guatemala", "guernsey", "guinea", "guinea bissau", "guyana", "haiti", "honduras", "hong kong", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland", "isle of man", "israel", "italy", "jamaica", "japan", "jersey", "jordan", "kazakhstan", "kenya", "kuwait", "kyrgyz republic", "laos", "latvia", "lebanon", "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "macau", "macedonia", "madagascar", "malawi", "malaysia", "maldives", "mali", "malta", "mauritania", "mauritius", "mexico", "moldova", "monaco", "mongolia", "montenegro", "montserrat", "morocco", "mozambique", "namibia", "nepal", "netherlands", "netherlands antilles", "new caledonia", "new zealand", "nicaragua", "niger", "nigeria", "norway", "oman", "pakistan", "palestine", "panama", "papua new guinea", "paraguay", "peru", "philippines", "poland", "portugal", "puerto rico", "qatar", "reunion", "romania", "russia", "rwanda", "saint pierre & miquelon", "samoa", "san marino", "satellite", "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "south africa", "south korea", "spain", "sri lanka", "st kitts & nevis", "st lucia", "st vincent", "st. lucia", "sudan", "suriname", "swaziland", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "timor l'este", "togo", "tonga", "trinidad & tobago", "tunisia", "turkey", "turkmenistan", "turks & caicos", "uganda", "ukraine", "united arab emirates", "united kingdom", "uruguay", "uzbekistan", "vatican city", "venezuela", "vietnam", "virgin islands (us)", "yemen", "zambia", "zimbabwe"];
    this.country = '';
    this.country1 = '';
    this.country2 = '';
    this.country3 = '';
    this.country4 = '';
    this.container = '';
    this.displayCountries = true;
    this.universities = [];
  }

  /*displayO(json) receives json, hides rotating countries, and displays all the universities in the entered country as links to their websites.*/
  displayO(json: any[]) {
    if (json.length === 0 && this.countries.includes(this.country.toLowerCase()) === true) {
      alert(this.country + " has no university!");
    }
    else if (json.length === 0 && this.countries.includes(this.country.toLowerCase()) === false) {
      alert(this.country + " is not a country!");
    }
    else {
      this.displayCountries = false;
      for (var i = 0; i < (json.length); i++) {
        var university = new University(json[i].name, json[i].web_pages[0]);
        if (!this.universities.some(u => u.name == university.name)) {
          this.universities.push(university);
        }
      }
    }
  }

  /*ngOnInit() runs rotateI() when the city component is initialised.*/
  ngOnInit(): void {
    this.rotateO();
  }

  /*returnRandomO() generates and returns a random number between 0 and 205.*/
  returnRandomO() {
    var max = 205;
    return Math.floor(Math.random() * max) + 1;
  }

  /*rotateO() displays 4 random countries determined by returnRandomO() and rotates them every 1.8 seconds.*/
  rotateO() {
    setInterval(() => {
      this.country1 = this.countries[this.returnRandomO()], this.country2 = this.countries[this.returnRandomO()], this.country3 = this.countries[this.returnRandomO()], this.country4 = this.countries[this.returnRandomO()];
    }, 1800);
  }

  /*save(university: University) receives university, calls a method of http_service.ts, and gives a saved alert.*/
  save(university: University) {
    this.httpService.postUniversity(university).subscribe(() => {
      alert(`Saved ${university.name}!`);
    });
  }

  /*searchO() concatenates entered country with the URL to create url that is passed into window.fetch(url).*/
  searchO() {
    var url = "http://universities.hipolabs.com/search?country=" + this.country;
    window.fetch(url)
      .then(urlRes => urlRes.json())
      .then(jsonRes => this.displayO(jsonRes));
  }

}