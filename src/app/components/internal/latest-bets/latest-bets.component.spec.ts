import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBetsComponent } from './latest-bets.component';

describe('LatestBetsComponent', () => {
  let component: LatestBetsComponent;
  let fixture: ComponentFixture<LatestBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestBetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
