import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import axios from 'axios';
import {waitAsync} from '../utils/promises.utils';

export interface PageItem {
    id: number;
    bookId: number;
    pageNumber: number;
    elements: Array<Elem>;
}

export interface Elem {
    type: string;
    id: number;
    mediaBlobUrl?: string;
    text?: string;
    url?: string;
    alt?: string;
    frame?: Frame;
}

interface Frame {
    translate: number[];
    rotate: number;
    width: number;
    height: number;
}

class CurrentBookStore {
    @observable isLoading = false;
    @observable currentErrorMessage: string | null = null;
    @observable pages: PageItem[] = []
    @observable currentPageNumber: number = 1;

    constructor() {
        makeObservable(this);
    }

    @action
    async initializePages() {
        try {
            this.isLoading = true;

            this.currentErrorMessage = null;

            await waitAsync(2000); // To show the loading indication is working
            const {data: {pages}} = await axios.get('pages.json');

            runInAction(() => {
                this.pages = pages;
            });
        } catch (e) {
            this.currentErrorMessage = e.message;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    @action addPage(id: number, bookId: number, pageNumber: number, elements: []) {
        const item: PageItem = {
            id,
            bookId,
            pageNumber,
            elements
        }
        this.pages.push(item)
    }

    @action addText(text: string) {
        const textItem: Elem = {
            type: 'text',
            id: Number(Math.random().toFixed(3)),
            text,
        }
        this.currentPage.elements.push(textItem)
    }

    @action addAudio(mediaBlobUrl: string) {
        const audioItem: Elem = {
            type: 'audio',
            id: Number(Math.random().toFixed(3)),
            mediaBlobUrl
        }
        this.currentPage.elements.push(audioItem)
    }

    @action increasePage = (): void => {
        const nextPageNumber = Math.min(this.currentPageNumber + 1, this.pages.length - 1)
        this.setCurrentPage(nextPageNumber);
    }

    @action decreasePage = (): void => {
        const nextPageNumber = Math.max(this.currentPageNumber - 1, 0)
        this.setCurrentPage(nextPageNumber);
    }

    @action setCurrentPage = (pageNumber: number): void => {
        this.currentPageNumber = pageNumber;
    }

    @computed get currentPage(): PageItem {
        return this.pages[this.currentPageNumber] || {} as PageItem;
    }

    @computed get nextPage(): PageItem {
        return this.pages[this.currentPageNumber + 1]
    }

    @computed get countPages(): number {
        return this.pages.length
    }

    @action currentElementUpdateTranslate = (id: number, translate: number[]) => {
        console.log(id, translate)
        // this.currentPage.elements.find(el => el.id === id)?.frame.translate
        // elem.frame?.translate = translate
    }

    @action currentElementUpdateRotate= (id: number, rotate: number) => {
        console.log(id, rotate)
        // this.currentPage.elements.find(el => el.id === id)?.frame.translate
        // elem.frame?.translate = translate
    }

    @action currentElementUpdateSizes = (id: number, width: number, height: number) => {
        console.log(id, width, height)
        // this.currentPage.elements.find(el => el.id === id)?.frame.translate
        // elem.frame?.translate = translate
    }

}

export default new CurrentBookStore();
