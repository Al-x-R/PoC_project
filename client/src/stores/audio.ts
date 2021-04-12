import {action, makeObservable, observable} from 'mobx';

export interface AudioItem {
    id: number
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

    addAudio(mediaBlobUrl: string) {
        const item: AudioItem = {
            id: Number(Math.random().toFixed(3)),
            mediaBlobUrl,
        }
        this.audios.push(item)
    }
}

export const AudioStore = new AudioItemImpl()