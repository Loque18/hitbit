import { Component, Input } from '@angular/core';

@Component({
    selector: 'comp-tab',
    templateUrl: './tab.component.html',
})
export class TabComponent {
    @Input() tabId: string = '';
    @Input() tabName: string = '';

    protected _active: boolean = false;

    get id(): string {
        return this.tabId;
    }

    get name(): string {
        return this.tabName;
    }

    get isActive(): boolean {
        return this._active;
    }

    setActive(v: boolean): void {
        this._active = v;
    }
}
