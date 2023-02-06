import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should collapse', fakeAsync(() => {
    //     spyOn(component, 'toggleCollapsed');

    //     let button = fixture.debugElement.nativeElement.querySelector('#collapse-sidebar-button');
    //     button.click();

    //     tick();

    //     expect(component.toggleCollapsed).toHaveBeenCalled();
    // }));

    // it('should collapse', () => {
    //     // simulate click on collapse button
    //     component.toggleCollapsed();

    //     // check if collapsed is true
    //     expect(component.collapsed).toBeTruthy();
    // });
});
