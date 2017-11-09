import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import "rxjs/add/observable/throw";

interface SPAFramework {
  label: string;
  url: string;
}
export class App {
  public frameworks: Observable<SPAFramework[]>;
  public frameworkOverTime: Observable<SPAFramework>;
  public isSequenceDone: boolean = false;
  public succeedingPromise: Promise<any> = Promise.resolve({ blub: "yeehaa"});
  public failingPromise: Promise<string> = Promise.reject("boo");
  public failingObservable: Observable<any>;

  constructor() {
    const data: SPAFramework[] = [
      { label: "Aurelia", url: "http://aurelia.io" },
      { label: "Angular v4", url: "http://angular.io" },
      { label: "React", url: "https://facebook.github.io/react/" },
    ];

    this.frameworks = Observable.of(data);

    this.frameworkOverTime = Observable.interval(2000)
      .map((idx) => data[idx])
      .take(data.length);

    this.failingObservable = Observable.throw(new Error("foo"));
  }

  public completedHandler = () => {
    setTimeout(() => this.isSequenceDone = true, 2000);
  }

  public promiseFailHandler = (e: any) => {
    console.log(e);
  }

  public observableFailHandler = (e: any) => {
    console.log(e.message);
  }
}
