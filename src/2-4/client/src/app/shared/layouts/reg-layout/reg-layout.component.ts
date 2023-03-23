import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces';
import { AuphServices } from '../../../services/auth.services';

@Component({
  selector: 'app-reg-layout',
  templateUrl: './reg-layout.component.html',
})
export class RegLayoutComponent implements OnDestroy {

  constructor(
    private auth: AuphServices,
    private router: Router) { }

  formRegisr: FormGroup = new FormGroup({
    regUser: new FormControl<string>('', [Validators.required]),
    regPass: new FormControl<string>('', [Validators.required])
  });

  aSub: Subscription;

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.formRegisr.disable();

    const regUser: User = {
      login: this.formRegisr.value.regUser,
      pass: this.formRegisr.value.regPass,
    }

    this.aSub = this.auth.register(regUser).subscribe({
      error: (e) => {
        alert(e.error.error);
        this.formRegisr.enable();
      },
      complete: () => console.info('complete'),
      next: (n) => {
        console.log(n);
        this.router.navigate(['/todo'])
      }
    })
  }

}
