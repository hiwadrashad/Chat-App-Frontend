import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupChatModalComponent } from './add-group-chat-modal.component';

describe('AddGroupChatModalComponent', () => {
  let component: AddGroupChatModalComponent;
  let fixture: ComponentFixture<AddGroupChatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupChatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupChatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
