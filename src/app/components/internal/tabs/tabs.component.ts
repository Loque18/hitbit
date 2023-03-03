import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

type Tab = {
    name: string;
    id: string;
};

@Component({
    selector: 'comp-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
    @Input() activeTabId: string = '';

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();

    @Output() tabChange = new EventEmitter<string>();

    private changeTab(tab: string): void {
        // get current active tab
        const activeTab = this.tabs.find((t: TabComponent) => t.isActive);
        activeTab?.setActive(false);

        // set new active tab
        const newActiveTab = this.tabs.find((t: TabComponent) => t.id === tab);
        newActiveTab?.setActive(true);

        this.activeTabId = tab;

        this.tabChange.emit(tab);
    }

    ngAfterContentInit(): void {
        // validate provided activeId
        if (this.activeTabId && !this.tabs.find((t: TabComponent) => t.id === this.activeTabId)) {
            throw new Error(`Tab with id ${this.activeTabId} not found`);
        }

        if (this.activeTabId) {
            this.tabs.find((t: TabComponent) => t.id === this.activeTabId)?.setActive(true);
        } else {
            const id = this.tabs.first.id;
            this.activeTabId = id;
            this.tabs.first.setActive(true);
        }
    }

    protected tabClick(e: Event): void {
        const targetElmt: HTMLElement = e.currentTarget as HTMLElement;
        const tabId = targetElmt.getAttribute('data-tab') as string;
        this.changeTab(tabId);
    }
}
