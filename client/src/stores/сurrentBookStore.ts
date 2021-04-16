import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import axios from "axios";
import {waitAsync} from '../utils/promises.utils';

export interface PageItem {
    id: number;
    bookId: number;
    pageNumber: number;
    elements: Array<Elm>;
}

export interface Elm {
    type: string;
    id: number;
    url?: string;
    alt?: string;
    text?: string;
    mediaBlobUrl?: string;
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

    @action addText(text: string){
        const textItem: Elm = {
            type: 'text',
            id: Number(Math.random().toFixed(3)),
            text
        }
        console.log('textItem ', textItem)
        // this.pages[this.currentPageNumber].elements.push(textItem)
        this.currentPage.elements.push(textItem)
        console.log(this.currentPage.elements)

    }

    @action addAudio(mediaBlobUrl: string) {
        const audioItem: Elm = {
            type: 'audio',
            id: Number(Math.random().toFixed(3)),
            mediaBlobUrl
        }
        console.log('audio item ', audioItem)
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

    @computed get countPages() {
        return this.pages.length
    }
}

export default new CurrentBookStore();
