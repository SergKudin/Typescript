import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuphServices } from '../../../services/auth.services';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
})
export class SiteLayoutComponent implements OnDestroy {
  aSub: Subscription;

  constructor(
    private auth: AuphServices,
    private router: Router,
  ) { }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }


  logout() {
    this.aSub = this.auth.logout().subscribe({
      error: (e) => {
        console.error(e);
        alert(e.error.error);
      },
      complete: () => console.info('complete'),
      next: (n) => {
        console.log(n);
        this.router.navigate(['/login'])
      }
    })

  }
}
