import React, {useState} from "react";
import { SlideModel } from "../models/SlideModel";
import { IntroSlide } from "./slides/IntroSlide";


interface SlideFactoryProps {
    slide: SlideModel;
    onSlideComplete?: () => void;
}

export const SlideFactory: React.FC<SlideFactoryProps> = ({ slide, onSlideComplete }) => {
    const [typingCompleted, setTypingCompleted] = useState(false);


    const handleTypingComplete = () => {
        setTypingCompleted(true);
        onSlideComplete?.();
    }



    switch (slide.type) {
        case 'slide_intro':
            return <IntroSlide slide={slide}  onTypingComplete={handleTypingComplete} slideId={slide.id} />;
        case 'slide_content':
        default:
            return null;
    }
};
