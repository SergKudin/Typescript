import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
})
export class GlobalErrorComponent {

  constructor(
    public errorService: ErrorService) { }

}
