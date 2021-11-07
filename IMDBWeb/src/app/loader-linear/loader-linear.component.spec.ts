import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderLinearComponent } from './loader-linear.component';

describe('LoaderLinearComponent', () => {
  let component: LoaderLinearComponent;
  let fixture: ComponentFixture<LoaderLinearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderLinearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
