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
        map((res: { payload: [] }) => res.payload),
        shareReplay(),
        catchError(err => of([{
          id: 0,
          description: 'RxJs In Practice Course',
          iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
          courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
          longDescription: 'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples',
          category: 'BEGINNER',
          lessonsCount: 10
        }]))
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
