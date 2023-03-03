import { Component, EventEmitter, Input, Output } from '@angular/core';

type Tab = {
    name: string;
    id: string;
};

@Component({
    selector: 'comp-tabs[tabs]',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
    @Input() tabs: Tab[] = [];
    @Input() activeTabId: string = '';

    @Output() tabChange = new EventEmitter<string>();

    onTabChange(tab: string) {
        this.tabChange.emit(tab);
    }
}
