import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces';
import { AuphServices } from '../../services/auth.services';

@Component({
  selector: 'app-reg-layout',
  templateUrl: './reg-layout.component.html',
})
export class RegLayoutComponent {
  constructor(private auth: AuphServices) { }

  formRegisr: FormGroup = new FormGroup({
    regUser: new FormControl<string>('', [Validators.required]),
    regPass: new FormControl<string>('', [Validators.required])
  });

  ngOnInit() {
  }

  onSubmit() {

    const regUser: User = {
      login: this.formRegisr.value.regUser,
      pass: this.formRegisr.value.regPass,
    }

    this.auth.register(regUser).subscribe({
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

}
