import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermanFormComponent } from './superman-form.component';

describe('SupermanFormComponent', () => {
  let component: SupermanFormComponent;
  let fixture: ComponentFixture<SupermanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupermanFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupermanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
