import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  http$ = createHttpObservable('/api/courses');
  courses$: Observable<Course[]>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {
      this.courses$ = this.http$.pipe(
        map((res: { payload: [] }) => res.payload)
      );

      this.beginnerCourses$ = this.courses$.pipe(
        map((courses: Course[]) => courses.filter(item => item.category === 'BEGINNER'))
      );

      this.advancedCourses$ = this.courses$.pipe(
        map((courses: Course[]) => courses.filter(item => item.category === 'ADVANCED'))
      );

      /*this.courses$.subscribe(
        (courses: Course[]) => {
        },
        noop,
        () => console.log('completed')
      );*/



    }

}
