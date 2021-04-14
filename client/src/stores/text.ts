import {action, makeObservable, observable} from 'mobx';

export interface TextItem {
    id: number
    pageId: number
    pageNumber: number
    text: string
}

export class TextItemImpl {
    texts: TextItem[] = []

    constructor() {
        makeObservable(this, {
            texts: observable,
            addText: action
        })
    }

    addText(text: string, pageId: number, pageNumber: number) {
        const item: TextItem = {
            id: Number(Math.random().toFixed(3)),
            pageId,
            pageNumber,
            text
        }
        this.texts.push(item)
    }
}

export const TextStore = new TextItemImpl()