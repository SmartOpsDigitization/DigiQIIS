import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedResponsesForAolComponent } from './submitted-responses-for-aol.component';

describe('SubmittedResponsesForAolComponent', () => {
  let component: SubmittedResponsesForAolComponent;
  let fixture: ComponentFixture<SubmittedResponsesForAolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedResponsesForAolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedResponsesForAolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
