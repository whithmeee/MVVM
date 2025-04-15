import React from "react";
import { SlideModel } from "../models/SlideModel";
import { TitleSlide } from "./slides/TitleSlide";
import { IntroSlide } from "./slides/IntroSlide";

interface SlideFactoryProps {
    slide: SlideModel;
    isActive: boolean;
    onComplete?: () => void;
}

export const SlideFactory: React.FC<SlideFactoryProps> = ({
                                                              slide,
                                                              isActive,
                                                              onComplete
                                                          }) => {
    switch (slide.type) {
        case "title":
            return <TitleSlide slide={slide} isActive={isActive} onComplete={onComplete} />;
        case "intro":
            return <IntroSlide slide={slide} isActive={isActive} onComplete={onComplete} />;
        default:
            return null;
    }
};
