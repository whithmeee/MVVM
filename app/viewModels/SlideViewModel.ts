import { makeAutoObservable } from "mobx";
import { SlideModel } from "../models/SlideModel";
export class SlideViewModel {
    slides: SlideModel[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadMockData();
    }

    loadMockData() {
        this.slides = [
            new SlideModel(
                "1",
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
                [
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                    "Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                    "Donec quam felis, ultricies nec."
                ],
                "title",
                "Vasya Pupkin",
                "https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1200/https://cdn.gamma.app/itvqlznmcxiyxtm/generated-images/tqBeLeMzW09laa6jfdTJx.png"
            ),

            ]
    }
}
