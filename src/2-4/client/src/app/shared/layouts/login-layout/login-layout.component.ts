import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces';
import { AuphServices } from '../../../services/auth.services';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
})
export class LoginLayoutComponent implements OnDestroy {

  constructor(
    private auth: AuphServices,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  formLogin: FormGroup = new FormGroup({
    logUser: new FormControl<string>('', [Validators.required]),
    logPass: new FormControl<string>('', [Validators.required])
  });

  aSub: Subscription;

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.formLogin.disable();
    const logUser: User = {
      login: this.formLogin.value.logUser,
      pass: this.formLogin.value.logPass,
    }

    this.aSub = this.auth.login(logUser).subscribe({
      error: (e) => {
        console.error(e);
        alert(e.error.error);
        this.formLogin.enable();
      },
      complete: () => console.info('complete'),
      next: (n) => {
        console.log(n);
        this.router.navigate(['/todo'])
      }
    })
  }
}
