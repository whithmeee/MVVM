// src/viewModels/SlideViewModel.ts
import { makeAutoObservable } from "mobx";
import { SlideModel, SlideType } from "../models/SlideModel";

export class SlideViewModel {
    slides: SlideModel[] = [];
    currentSlideIndex = 0;

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
                "slide_intro",
                "Имя Фамилия", // Автор
                "https://example.com/background.jpg" // Фоновое изображение
            ),
            // Другие слайды...
        ];
    }
}
