"use client";
import styles from './IntroSlide.module.css';
import { SlideModel } from "@/app/models/SlideModel";
import { useTypingAnimation } from "@/app/components/hooks/useTypingAnimation";
import {useEffect} from "react";

interface IntroSlideProps {
    slide: SlideModel;
    onComplete?: () => void;
    isActive: boolean,
    thumbnailMode?: boolean
}

export const IntroSlide = ({ slide, onComplete, isActive, thumbnailMode }: IntroSlideProps) => {
    const {
        visibleTitle,
        visibleContent,
        isComplete,
        currentPhase
    } = useTypingAnimation(slide, isActive);

    useEffect(() => {
        if (isComplete && onComplete) {
            onComplete();
        }
    }, [isComplete]);

    return (
        <div className={styles.intro}>
            {slide.backgroundImage && (
                <div className={styles.imageContainer}>
                    <div
                        className={styles.slideImage}
                        style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                    />
                </div>
            )}

            <div className={styles.contentContainer}>
                <h1>
                    {visibleTitle}
                </h1>

                {(currentPhase === 'content' || currentPhase === 'author' || isComplete) && (
                    <div className={styles.introText}>
                        {visibleContent.split('\n').map((line, i) => (
                            <p key={i}>
                                {line}
                                {currentPhase === 'content' && i === visibleContent.split('\n').length - 1 && (
                                    <span className={styles.cursor}>|</span>
                                )}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
