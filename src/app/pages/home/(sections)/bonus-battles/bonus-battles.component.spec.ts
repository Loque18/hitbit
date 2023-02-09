import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusBattlesComponent } from './bonus-battles.component';

describe('BonusBattlesComponent', () => {
  let component: BonusBattlesComponent;
  let fixture: ComponentFixture<BonusBattlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusBattlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusBattlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
