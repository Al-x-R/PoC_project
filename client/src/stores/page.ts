import {action, makeObservable, observable} from 'mobx';
import axios from "axios";

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

            getPages: action,
            addPage: action,
            getPage: action
        })
    }

    getPages() {
        axios.get('pages.json').then(res => {
            res.data.pages.map((page: PageItem) => this.pages.push(page))
        })
        console.log('get action pages', this.pages)
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
        console.log(' this page num', pageNumber)
        return this.pages.filter(page => page.pageNumber === 3)
    }
}

export const PageStore = new PageItemImpl()