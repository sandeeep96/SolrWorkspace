import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedTableComponentComponent } from './updated-table-component.component';

describe('UpdatedTableComponentComponent', () => {
  let component: UpdatedTableComponentComponent;
  let fixture: ComponentFixture<UpdatedTableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedTableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
