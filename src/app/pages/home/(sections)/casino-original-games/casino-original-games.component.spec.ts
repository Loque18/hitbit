import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoOriginalGamesComponent } from './casino-original-games.component';

describe('CasinoOriginalGamesComponent', () => {
  let component: CasinoOriginalGamesComponent;
  let fixture: ComponentFixture<CasinoOriginalGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoOriginalGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasinoOriginalGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
