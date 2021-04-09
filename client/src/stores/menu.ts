import {action, makeObservable, observable} from "mobx";

export class MenuState {

    isAudio: boolean = false;
    constructor() {
        makeObservable(this, {
            isAudio: observable,
            toggleIsAudio: action
        })
    }

    toggleIsAudio = (value: boolean) => {
        this.isAudio = value
        console.log(value)
    }

}

export const MenuStore = new MenuState()