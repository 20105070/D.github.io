/*city.component.ts - Daniel Syrén (20105070)*/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service';
import { University } from '../models/university';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {

  cities: string[];
  city: string;
  city1: string;
  city2: string;
  city3: string;
  city4: string;
  container: string;
  displayCities: boolean;
  universities: University[];

  /*constructor(private httpService: HttpService) injects httpService and initialises declared variables.*/
  constructor(private httpService: HttpService) {
    /*https://www.html-code-generator.com/javascript/array/country-names*/
    this.cities = ["kabul", "mariehamn", "tirana", "algiers", "pago pago", "andorra la vella", "luanda", "the valley", "antarctica", "st. john's", "buenos aires", "yerevan", "oranjestad", "canberra", "vienna", "baku", "nassau", "manama", "dhaka", "bridgetown", "minsk", "brussels", "belmopan", "porto-novo", "hamilton", "thimphu", "sucre", "kralendijk", "sarajevo", "gaborone", "brasilia", "diego garcia", "bandar seri begawan", "sofia", "ouagadougou", "bujumbura", "phnom penh", "yaounde", "ottawa", "praia", "george town", "bangui", "n'djamena", "santiago", "beijing", "flying fish cove", "west island", "bogota", "moroni", "brazzaville", "kinshasa", "avarua", "san jose", "yamoussoukro", "zagreb", "havana", "willemstad", "nicosia", "prague", "copenhagen", "djibouti", "roseau", "santo domingo", "quito", "cairo", "san salvador", "malabo", "asmara", "tallinn", "addis ababa", "stanley", "torshavn", "suva", "helsinki", "paris", "cayenne", "papeete", "port-aux-francais", "libreville", "banjul", "tbilisi", "berlin", "accra", "gibraltar", "athens", "nuuk", "st. george's", "basse-terre", "hagatna", "guatemala city", "st peter port", "conakry", "bissau", "georgetown", "port-au-prince", "vatican city", "tegucigalpa", "hong kong", "budapest", "reykjavik", "new delhi", "jakarta", "tehran", "baghdad", "dublin", "douglas, isle of man", "jerusalem", "rome", "kingston", "tokyo", "saint helier", "amman", "astana", "nairobi", "tarawa", "pyongyang", "seoul", "pristina", "kuwait city", "bishkek", "vientiane", "riga", "beirut", "maseru", "monrovia", "tripolis", "vaduz", "vilnius", "luxembourg", "macao", "skopje", "antananarivo", "lilongwe", "kuala lumpur", "male", "bamako", "valletta", "majuro", "fort-de-france", "nouakchott", "port louis", "mamoudzou", "mexico city", "palikir", "chisinau", "monaco", "ulan bator", "podgorica", "plymouth", "rabat", "maputo", "nay pyi taw", "windhoek", "yaren", "kathmandu", "amsterdam", "willemstad", "noumea", "wellington", "managua", "niamey", "abuja", "alofi", "kingston", "saipan", "oslo", "muscat", "islamabad", "melekeok", "east jerusalem", "panama city", "port moresby", "asuncion", "lima", "manila", "adamstown", "warsaw", "lisbon", "san juan", "doha", "saint-denis", "bucharest", "moscow", "kigali", "gustavia", "jamestown", "basseterre", "castries", "marigot", "saint-pierre", "kingstown", "apia", "san marino", "sao tome", "riyadh", "dakar", "belgrade", "belgrade", "victoria", "freetown", "singapur", "philipsburg", "bratislava", "ljubljana", "honiara", "mogadishu", "pretoria", "grytviken", "juba", "madrid", "colombo", "khartoum", "paramaribo", "longyearbyen", "mbabane", "stockholm", "berne", "damascus", "taipei", "dushanbe", "dodoma", "bangkok", "dili", "lome", "nuku'alofa", "port of spain", "tunis", "ankara", "ashgabat", "cockburn town", "funafuti", "kampala", "kiev", "abu dhabi", "london", "washington", "montevideo", "tashkent", "port vila", "caracas", "hanoi", "road town", "charlotte amalie", "mata utu", "el-aaiun", "sanaa", "lusaka", "harare"];
    this.city = '';
    this.city1 = '';
    this.city2 = '';
    this.city3 = '';
    this.city4 = '';
    this.container = '';
    this.displayCities = true;
    this.universities = [];
  }

  /*displayI(json: any[]) receives json, hides rotating cities, and displays all the universities in the entered city as links to their websites.*/
  displayI(json: any[]) {
    if (json.length === 0 && this.cities.includes(this.city.toLowerCase()) === true) {
      alert(this.city + " has no university!");
    }
    else if (json.length === 0 && this.cities.includes(this.city.toLowerCase()) === false) {
      alert(this.city + " is not a city!");
    }
    else {
      this.displayCities = false;
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
    this.rotateI();
  }

  /*returnRandomI() generates and returns a random number between 0 and 247.*/
  returnRandomI() {
    var max = 247;
    return Math.floor(Math.random() * max) + 1;
  }

  /*rotateI() displays 4 random cities determined by returnRandomI() and rotates them every 1.8 seconds.*/
  rotateI() {
    setInterval(() => {
      this.city1 = this.cities[this.returnRandomI()], this.city2 = this.cities[this.returnRandomI()], this.city3 = this.cities[this.returnRandomI()], this.city4 = this.cities[this.returnRandomI()];
    }, 1800);
  }

  /*save(university: University) receives university, calls a method of http_service.ts, and gives a saved alert.*/
  save(university: University) {
    this.httpService.postUniversity(university).subscribe(() => {
      alert(`Saved ${university.name}!`);
    });
  }

  /*searchI() concatenates entered city with the URL to create url that is passed into window.fetch(url).*/
  searchI() {
    var url = "http://universities.hipolabs.com/search?name=" + this.city;
    window.fetch(url)
      .then(urlRes => urlRes.json())
      .then(jsonRes => this.displayI(jsonRes));
  }

}