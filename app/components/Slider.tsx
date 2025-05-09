import { observer } from "mobx-react-lite";
import { SlideViewModel } from "../viewModels/SlideViewModel";
import { SlideFactory } from "./SlideFactory";
import styles from './Slider.module.css';
import { useState, useEffect, useRef } from 'react';
import {ThumbnailWrapper} from "@/app/components/ThumbnailWrapper";

interface SliderProps {
    viewModel: SlideViewModel;
}

export const Slider = observer(({ viewModel }: SliderProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState([0]);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCardComplete = () => {
        if (currentCardIndex < viewModel.slides.length - 1) {
            const nextIndex = currentCardIndex + 1;
            setVisibleCards(prev => [...prev, nextIndex]);
            setCurrentCardIndex(nextIndex);
        }
    };


    useEffect(() => {
        if (visibleCards.length > 1) {
            const lastCard = document.getElementById(`card-${visibleCards[visibleCards.length - 1]}`);
            if (lastCard) {
                lastCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }, [visibleCards]);

   return  (
        <div className={styles.container}>
            {/* Сайдбар с миниатюрами */}
            <div className={styles.sidebar}>
                {viewModel.slides.map((card, index) => (
                    <ThumbnailWrapper
                        key={`thumb-${card.id}`}
                        isActive={index === currentCardIndex}
                        onClick={() => setCurrentCardIndex(index)}
                    >

                        <SlideFactory
                            slide={card}
                            isActive={index === currentCardIndex}
                            onComplete={index === currentCardIndex ? handleCardComplete : undefined}
                        />
                    </ThumbnailWrapper>
                ))}
            </div>

            {/* Основной слайдер */}
            <div ref={containerRef} className={styles.cardsContainer}>
                {viewModel.slides.map((card, index) => (
                    visibleCards.includes(index) && (
                        <div
                            key={card.id}
                            id={`card-${index}`}
                            className={styles.cardWrapper}
                        >
                            <SlideFactory
                                slide={card}
                                isActive={index === currentCardIndex}
                                onComplete={index === currentCardIndex ? handleCardComplete : undefined}
                            />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
});
