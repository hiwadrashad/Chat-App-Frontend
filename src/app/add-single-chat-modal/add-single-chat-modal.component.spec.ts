import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleChatModalComponent } from './add-single-chat-modal.component';

describe('AddSingleChatModalComponent', () => {
  let component: AddSingleChatModalComponent;
  let fixture: ComponentFixture<AddSingleChatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSingleChatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSingleChatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
