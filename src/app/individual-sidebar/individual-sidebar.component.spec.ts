import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSidebarComponent } from './individual-sidebar.component';

describe('IndividualSidebarComponent', () => {
  let component: IndividualSidebarComponent;
  let fixture: ComponentFixture<IndividualSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
