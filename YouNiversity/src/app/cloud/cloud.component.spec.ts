/*cloud.component.spec.ts - Daniel Syrén (20105070)*/
import { CloudComponent } from './cloud.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http_service';
import { of } from 'rxjs';
import { University } from '../models/university';

describe('CloudComponent', () => {
  let component: CloudComponent;
  let fixture: ComponentFixture<CloudComponent>;
  const spy = jasmine.createSpyObj('HttpService', ['deleteUniversity', 'getUniversities', 'postUniversity']);
  spy.deleteUniversity.and.returnValue(of());
  spy.getUniversities.and.returnValue(of());
  spy.postUniversity.and.returnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloudComponent],
      imports: [FormsModule],
      providers: [{ provide: HttpService, useValue: spy }]
    });
    fixture = TestBed.createComponent(CloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Use-case 5
  it('should retrieve universities from a database', () => {
    spy.getUniversities.calls.reset();
    component.load();
    expect(spy.getUniversities).toHaveBeenCalled();
  });

  //Use-case 6
  it('should remove university from a database', () => {
    spy.deleteUniversity.calls.reset();
    var university = new University("National College of Ireland", "http://www.ncirl.ie/");
    component.delete(university.name);
    expect(spy.deleteUniversity).toHaveBeenCalledWith(university.name);
  });

});