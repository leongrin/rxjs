import {Component, OnInit} from '@angular/core';
import {noop, Observable} from 'rxjs';
import {createHttpObservable} from '../common/util';
import {map} from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  http$ = createHttpObservable('/api/courses');
  courses$: Observable<any>;

  constructor() {
  }

  ngOnInit() {
    this.courses$ = this.http$.pipe(
      map((res: {payload: []}) => res.payload)
    )

    this.courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    )
  }

}
