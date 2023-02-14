import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersGamesComponent } from './providers-games.component';

describe('ProvidersGamesComponent', () => {
  let component: ProvidersGamesComponent;
  let fixture: ComponentFixture<ProvidersGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
