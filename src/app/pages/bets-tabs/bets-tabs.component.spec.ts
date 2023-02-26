import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsTabsComponent } from './bets-tabs.component';

describe('BetsTabsComponent', () => {
  let component: BetsTabsComponent;
  let fixture: ComponentFixture<BetsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetsTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
