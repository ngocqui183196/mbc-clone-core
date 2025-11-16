import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectTrigger } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface Food {
  value: string;
  viewValue: string;
}

interface Account {
  number: string;
  balance: number;
  currency: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectTrigger
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form: FormGroup;
  title = 'mbc-clone';

  accounts: Account[] = [
    {
      number: '02381623745',
      balance: 120246000,
      currency: 'USD'
    },
    {
      number: '07700007251',
      balance: 12000000,
      currency: 'USD'
    },
    {
      number: '45600021300',
      balance: 457300,
      currency: 'USD'
    },
    {
      number: '00000000000',
      balance: 987298377371000,
      currency: 'VND'
    },
  ]

   foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(
    private fb: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('custom-down', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/down.svg'));

    this.form = this.fb.group({
      inputDemo: ['', Validators.required],
      selectDemo: [{value: '', disabled: false}, Validators.required]
    })
  }
}
