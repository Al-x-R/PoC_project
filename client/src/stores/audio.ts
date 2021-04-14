import {action, makeObservable, observable} from 'mobx';

export interface AudioItem {
    id: number
    pageId: number
    pageNumber: number
    mediaBlobUrl: string
}

export class AudioItemImpl {
    audios: AudioItem[] = []

    constructor() {
        makeObservable(this, {
            audios: observable,
            addAudio: action,
        })
    }

    addAudio(mediaBlobUrl: string, pageId: number, pageNumber: number) {
        const item: AudioItem = {
            id: Number(Math.random().toFixed(3)),
            pageId,
            pageNumber,
            mediaBlobUrl,
        }
        this.audios.push(item)
    }
}

export const AudioStore = new AudioItemImpl()