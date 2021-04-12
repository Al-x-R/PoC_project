import {action, makeObservable, observable} from "mobx";

export class MenuState {

    isAudio: boolean = false;
    isCountDown: boolean = false;
    isStartRecording: boolean = false

    constructor() {
        makeObservable(this, {
            isAudio: observable,
            isCountDown: observable,
            isStartRecording: observable,

            toggleIsAudio: action,
            switchIsCountDown: action,
            switchIsStartRecording: action
        })
    }

    toggleIsAudio = (value: boolean) => {
        this.isAudio = value
    }

    switchIsCountDown = (value: boolean) => {
        this.isCountDown = value
    }

    switchIsStartRecording = (value: boolean) => {
        this.isStartRecording = value
    }

}

export const MenuStore = new MenuState()