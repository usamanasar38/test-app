import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinlexFooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FinlexFooterComponent;
  let fixture: ComponentFixture<FinlexFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinlexFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinlexFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
