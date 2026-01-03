import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectTrigger } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { OtpComponent } from '../../shared/components/otp/otp.component';
// import { NumberToWordsPipe } from '../../shared/pipes/number-to-words.pipe';

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
  selector: 'app-account',
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectTrigger,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    TranslateModule,
    // NumberToWordsPipe,
    OtpComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  standalone: true,
  // providers: [TranslateService]
})
export class AccountComponent {
  form: FormGroup;
  title = 'mbc-clone';

  // private transLateService = inject(TranslateService)

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

  languages = [
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'vi',
      name: 'Tiếng Việt'
    },
  ];
  languageSelected = this.languages[0]

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

  selectLanguage(lang: {code: string, name: string}) {
    console.log(lang);
    this.languageSelected = lang;
    // this.transLateService.use(lang.code)
  }
}
