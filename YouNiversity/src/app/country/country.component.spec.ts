/*country.component.spec.ts - Daniel Syrén (20105070)*/
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CountryComponent } from './country.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http_service';
import { of } from 'rxjs';
import { University } from '../models/university';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  const spy = jasmine.createSpyObj('HttpService', ['deleteUniversity', 'getUniversities', 'postUniversity']);
  spy.deleteUniversity.and.returnValue(of());
  spy.getUniversities.and.returnValue(of());
  spy.postUniversity.and.returnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryComponent],
      imports: [FormsModule],
      providers: [{ provide: HttpService, useValue: spy }]
    });
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Use-case 1
  it('should display recommended countries', fakeAsync(() => {
    component.country1 = '';
    component.country2 = '';
    component.country3 = '';
    component.country4 = '';
    component.ngOnInit();
    tick(3600);
    expect((component.countries.includes(component.country1)) && (component.countries.includes(component.country2)) && (component.countries.includes(component.country3)) && (component.countries.includes(component.country4))).toBeTrue();
    discardPeriodicTasks();
  }));

  //Use-cases 2-3
  it('should display universities by country and open link to university website', fakeAsync(() => {
    var jsonRes: any[] = [
      {
        web_pages: "http://www.ncirl.ie/",
        domains: "ncirl.ie",
        country: "Ireland",
        name: "National College of Ireland",
        state_province: "Leinster",
        alpha_two_code: "IE"
      }
    ]
    component.displayO(jsonRes);
    expect(component.universities[0].name).toEqual("National College of Ireland");
  }));

  //Use-case 4
  it('should store university in a database', () => {
    spy.postUniversity.calls.reset();
    var university = new University("National College of Ireland", "http://www.ncirl.ie/");
    component.save(university);
    expect(spy.postUniversity).toHaveBeenCalledWith(university);
  });

});