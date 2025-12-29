
import { Component, ElementRef, inject, Input, NgZone, QueryList, ViewChildren } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { TransferService, typeOTPValue } from '../../transfer.service';
// import { AuthService } from '@pages/auth/auth.service';
// import { SettingService } from '@pages/components/settings/services/setting.service';
// import { firstValueFrom } from 'rxjs';
// import { formatTime } from '@shared/utils';
// import { AuthenticationMethod } from '@pages/components/settings/models/authentication-method.model';
// import { ToastService } from '@core/services/toast.service';
// import { TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-otp',
  imports: [],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  @Input() dataForm: any;
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  // private authService = inject(AuthService);
  // private transferService = inject(TransferService);
  // private settingService = inject(SettingService);
  // private toastService = inject(ToastService);
  // private translate: TranslateService = inject(TranslateService);
  // private ngZone = inject(NgZone);
  otp: string[] = ['', '', '', '', '', ''];
  // userInfo = this.authService.getUserInfo();
  authMethod: string = '';
  timeLeft: number = 0;
  interval: any;
  displayTime: string = '03:00';
  fb = inject(FormBuilder);
  form = this.fb.group({ otp: this.fb.array(Array.from({ length: this.otp.length }, () => new FormControl('', [Validators.required, Validators.pattern(/^\d$/)]))) });
  get otpArray(): FormArray {
    return this.form.get('otp') as FormArray;
  } onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.otpArray.at(index).setValue(value, { emitEvent: false });
    if (value && index < this.otp.length - 1) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  } onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key !== 'Backspace') return;
    event.preventDefault();
    if (this.otpArray.at(index).value || index > 0) {
      this.otpArray.at(index).setValue('', { emitEvent: false });
      this.inputs.toArray()[index - 1]?.nativeElement.focus();
      return;
    }
  } private startTimer() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.displayTime = `0${ minutes }:${ seconds < 10 ? '0' : '' }${ seconds }`;
      }
    }, 1000);
  } public submit(): any {
    const container = this.inputs.toArray().map((elRef: ElementRef) => elRef.nativeElement.value);
    if (container.join('')?.length < 6) {
      // this.toastService.showToastWarning(this.translate.instant('TRANSFER.VALIDATION_FAILED'));
      return;
    } return { ...this.dataForm, otp: container.join('') };
  } public async onSendOTP() {
    // let typeOTP: typeOTPValue;
    // switch (this.dataForm.transferType) {
    //   // case 'LOCAL_TRANSFER': typeOTP = 'TRANSFER_LOCAL_CREATE';
    //     break;
    //   // default: typeOTP = 'TRANSFER_OWN_ACCOUNT_CREATE';
    //     break;
    // };
    if (this.authMethod === '') {
      // let authenticationMethod: AuthenticationMethod = await firstValueFrom(this.settingService.getAuthenticationMethod());
      // this.authMethod = authenticationMethod.authenticationMethod;
    } if (this.timeLeft === 0) {
      // const valueOTP = await firstValueFrom(this.transferService.getOTP(typeOTP));
      // this.timeLeft = valueOTP.lifeTime / 1000;
      // this.displayTime = formatTime(this.timeLeft);
      this.startTimer();
    } setTimeout(() => {
      this.inputs.first?.nativeElement.focus();
    });
  } onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '');
    if (!pasted) return;
    const digits = pasted.split('');
    for (let i = 0;
      i < digits.length && index + i < this.otp.length;
      i++) {
        this.otpArray.at(index + i).setValue(digits[i], { emitEvent: false });
    } const lastIndex = Math.min(index + digits.length, this.otp.length);
    if (lastIndex > this.otp.length - 1) {
      this.inputs.toArray()[this.otp.length - 1]?.nativeElement.focus();
      return;
    } this.inputs.toArray()[lastIndex]?.nativeElement.focus();
  }
}
