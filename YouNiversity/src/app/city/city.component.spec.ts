/*city.component.spec.ts - Daniel Syrén (20105070)*/
import { CityComponent } from './city.component';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http_service';
import { of } from 'rxjs';
import { University } from '../models/university';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  const spy = jasmine.createSpyObj('HttpService', ['deleteUniversity', 'getUniversities', 'postUniversity']);
  spy.deleteUniversity.and.returnValue(of());
  spy.getUniversities.and.returnValue(of());
  spy.postUniversity.and.returnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityComponent],
      imports: [FormsModule],
      providers: [{ provide: HttpService, useValue: spy }]
    });
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Use-case 1
  it('should display recommended cities', fakeAsync(() => {
    component.city1 = '';
    component.city2 = '';
    component.city3 = '';
    component.city4 = '';
    component.ngOnInit();
    tick(3600);
    expect((component.cities.includes(component.city1)) && (component.cities.includes(component.city2)) && (component.cities.includes(component.city3)) && (component.cities.includes(component.city4))).toBeTrue();
    discardPeriodicTasks();
  }));

  //Use-cases 2-3
  it('should display universities by city and open link to university website', fakeAsync(() => {
    var jsonRes: any[] = [
      {
        web_pages: "https://www.varsitycollege.co.za/",
        domains: "varsitycollege.co.za",
        country: "South Africa",
        name: "Varsity College Durban North",
        state_province: "KwaZulu-Natal",
        alpha_two_code: "ZA"
      }
    ]
    component.displayI(jsonRes);
    expect(component.universities[0].name).toEqual("Varsity College Durban North");
  }));

  //Use-case 4
  it('should store university in a database', () => {
    spy.postUniversity.calls.reset();
    var university = new University("Varsity College Durban North", "https://www.varsitycollege.co.za/");
    component.save(university);
    expect(spy.postUniversity).toHaveBeenCalledWith(university);
  });

});