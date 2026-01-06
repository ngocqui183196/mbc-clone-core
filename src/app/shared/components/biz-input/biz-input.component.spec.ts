import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizInputComponent } from './biz-input.component';

describe('BizInputComponent', () => {
  let component: BizInputComponent;
  let fixture: ComponentFixture<BizInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BizInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BizInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
