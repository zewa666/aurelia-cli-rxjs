import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

export class App {
  message = 'Hello World!';

  attached() {
    Observable.of(3 * 7)
      .map((value) => value * 2)
      .subscribe(
        (result) => this.message = result.toString()
      );
  }
}
