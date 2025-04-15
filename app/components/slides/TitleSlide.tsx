"use client";
import { SlideModel } from "../../models/SlideModel";
import styles from './TitleSlide.module.css';
import { useTypingAnimation } from "@/app/components/hooks/useTypingAnimation";
import { useEffect } from "react";

export const TitleSlide = ({
                               slide,
                               isActive,
                               onComplete
                           }: {
    slide: SlideModel;
    isActive: boolean;
    onComplete?: () => void;
}) => {
    const {
        visibleTitle,
        visibleContent,
        visibleAuthor,
        isComplete,
        currentPhase
    } = useTypingAnimation(slide, isActive);

    useEffect(() => {
        if (isComplete && onComplete) {
            onComplete();
        }
    }, [isComplete]);

    return (
        <div className={styles.introSlide}>
            {slide.backgroundImage && (
                <div className={styles.imageContainer}>
                    <div
                        className={styles.slideImage}
                        style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                    />
                </div>
            )}

            <div className={styles.contentContainer}>
                <h1 className={styles.slideTitle}>
                    {visibleTitle}
                    {isActive && currentPhase === 'title' && <span className={styles.cursor}>|</span>}
                </h1>

                {(currentPhase === 'content' || currentPhase === 'author' || isComplete) && (
                    <div className={styles.slideText}>
                        {visibleContent.split('\n').map((line, i) => (
                            <p key={i}>
                                {line}
                                {isActive && currentPhase === 'content' &&
                                    i === visibleContent.split('\n').length - 1 && (
                                        <span className={styles.cursor}>|</span>
                                    )}
                            </p>
                        ))}
                    </div>
                )}

                {(currentPhase === 'author' || isComplete) && slide.authorName && (
                    <div className={styles.authorField}>
                        {visibleAuthor}
                        {isActive && currentPhase === 'author' && <span className={styles.cursor}>|</span>}
                    </div>
                )}
            </div>
        </div>
    );
};
