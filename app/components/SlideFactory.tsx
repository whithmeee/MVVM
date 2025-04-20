import {TitleSlide} from "@/app/components/slides/TitleSlide";
import {SlideModel} from "@/app/models/SlideModel";
import {IntroSlide} from "@/app/components/slides/IntroSlide";

interface SlideFactoryProps {
    slide: SlideModel;
    isActive: boolean;
    onComplete?: () => void;
}

export const SlideFactory = ({ slide, isActive, onComplete }: SlideFactoryProps) => {
    switch (slide.type) {
        case "title":
            return (
                <TitleSlide  slide={slide} isActive={isActive} onComplete={onComplete} />
            );
        case "intro":
            return (
                    <IntroSlide slide={slide} isActive={isActive} onComplete={onComplete} />
            );
        default:
            return null;
    }
};
