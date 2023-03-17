import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces';
import { AuphServices } from '../../services/auth.services';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
})
export class LoginLayoutComponent {

  constructor(private auth: AuphServices) { }

  formLogin: FormGroup = new FormGroup({
    logUser: new FormControl<string>('', [Validators.required]),
    logPass: new FormControl<string>('', [Validators.required])
  });

  ngOnInit() {
  }

  onSubmit() {

    const logUser: User = {
      login: this.formLogin.value.logUser,
      pass: this.formLogin.value.logPass,
    }

    this.auth.login(logUser).subscribe({
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
}
