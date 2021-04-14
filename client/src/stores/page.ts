import {action, makeObservable, observable} from 'mobx';

export interface PageItem {
    id: number
    bookId: number
    pageNumber: number
    img: object
}

export class PageItemImpl {
    pages: PageItem[] = []

    constructor() {
        makeObservable(this, {
            pages: observable,

            addPage: action,
            getPage: action
        })
    }

    addPage(id: number, bookId: number, pageNumber: number, img: object) {
        const item: PageItem = {
            id,
            bookId,
            pageNumber,
            img
        }
        this.pages.push(item)
    }

    getPage(pageNumber: number) {
        this.pages =  this.pages.filter(page => page.pageNumber === pageNumber)
    }
}

export const PageStore = new PageItemImpl()