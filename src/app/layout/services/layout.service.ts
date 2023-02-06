import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    // observable to subscribe to sidebar toggle changes
    private lastSidebarState = localStorage.getItem('layout.sidebarCollapsed') === 'true';
    private isSidebarCollapsed = new BehaviorSubject<boolean>(this.lastSidebarState);

    // observable to subscribe to chatcontainer toggle changes
    private lastChatContainerState = localStorage.getItem('layout.chatContainerCollapsed') === 'true';
    private isChatContainerCollapsed = new BehaviorSubject<boolean>(this.lastChatContainerState);

    // public observable to subscribe to sidebar toggle changes
    public isSidebarCollapsed$ = this.isSidebarCollapsed.asObservable();

    // public observable to subscribe to chat toggle changes
    public isChatCollapsed$ = this.isChatContainerCollapsed.asObservable();

    public toggleSidebar() {
        // toggle sidebar state
        this.isSidebarCollapsed.next(!this.isSidebarCollapsed.value);

        // save sidebar state to local storage
        localStorage.setItem('layout.sidebarCollapsed', this.isSidebarCollapsed.value.toString());
    }

    public toggleChat() {
        // toggle chat state
        this.isChatContainerCollapsed.next(!this.isChatContainerCollapsed.value);

        // save chat state to local storage
        localStorage.setItem('layout.chatContainerCollapsed', this.isChatContainerCollapsed.value.toString());
    }
}
