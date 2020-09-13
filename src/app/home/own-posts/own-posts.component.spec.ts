import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnPostsComponent } from './own-posts.component';

describe('OwnPostsComponent', () => {
  let component: OwnPostsComponent;
  let fixture: ComponentFixture<OwnPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
