import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSelectModule,
  //  MatSelectTrigger 
} from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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
    // MatSelectTrigger
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  @ViewChild('cursor', { static: true }) cursor!: ElementRef<HTMLDivElement>;


  constructor() {

    this.updateCursorScale();

    window.visualViewport?.addEventListener('resize', () => {
      this.updateCursorScale();
    });
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const el = this.cursor.nativeElement;
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(e: MouseEvent) {
    const target = e.target as HTMLElement;

    const isPointer =
      target.closest('a, button, [role="button"]') ||
      getComputedStyle(target).cursor === 'pointer';

    if (isPointer) {
      this.cursor.nativeElement.style.backgroundImage =
        "url('/assets/cursor/img-pointer.svg')";
    } else {
      this.cursor.nativeElement.style.backgroundImage =
        "url('/assets/cursor/img-default.svg')";
    }
  }

  updateCursorScale() {
    const scale = window.visualViewport?.scale || 1;

    document.documentElement.style.setProperty(
      '--cursor-scale',
      scale.toString()
    );
  }
}
