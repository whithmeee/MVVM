import { observer } from "mobx-react-lite";
import { SlideViewModel } from "../viewModels/SlideViewModel";
import { SlideFactory } from "./SlideFactory";
import styles from './Slider.module.css';

interface SliderProps {
    viewModel: SlideViewModel;
}

export const Slider = observer(({ viewModel }: SliderProps) => {
    const currentSlide = viewModel.slides[viewModel.currentSlideIndex];

    return (
        <div className={styles.sliderContainer}>
            {currentSlide && <SlideFactory slide={currentSlide} />}
        </div>
    );
});
