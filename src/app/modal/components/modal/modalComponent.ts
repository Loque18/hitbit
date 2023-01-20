import { IAppModal } from 'src/app/constants/modal';
import { ModalCoreService } from '../../services/modal-core.service';

export abstract class AbstModalComponent implements IAppModal {
    abstract id: string;
    show: boolean = false;
    protected onClose?: () => void = () => {};

    constructor(protected modalService: ModalCoreService) {}

    onInit() {
        this.modalService.modalSubject$.subscribe((modal: IAppModal) => {
            if (this.id === modal.id) {
                if (modal.show) this.open();
                else this.close();
            }
        });
    }

    // *~~*~~*~~*~~*~~* MODAL LOGIC *~~*~~*~~*~~*~~* //
    private open(): void {
        this.show = true;
    }

    private close(): void {
        this.show = false;
        this.onClose?.();
    }

    // *~~*~~*~~*~~*~~* MODAL EVENTS *~~*~~*~~*~~*~~* //

    protected onCloseClick(): void {}

    protected closeModal(): void {
        this.modalService.closeModal(this.id);
    }
}
