// components/slides/IntroSlide.tsx
"use client";
import React from "react";
import { SlideModel } from "../../models/SlideModel";
import { useTypingAnimation } from "../hooks/useTypingAnimation";
import styles from './IntroSlide.module.css';

interface IntroSlideProps {
    slide: SlideModel;
    onTypingComplete?: () => void;
    slideId: string;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({
                                                          slide,
                                                          onTypingComplete,
                                                          slideId
                                                      }) => {
    const {
        displayedTitle,
        displayedParagraphs,
        displayedAuthor,
        currentStage,
        contentRef,
        isTypingComplete,
    } = useTypingAnimation({
        slideId,
        title: slide.title,
        content: slide.content,
        authorName: slide.authorName,
        onTypingComplete,
    });

    return (
        <div className={styles.introSlide}>
             Блок с изображением слева
            {slide.backgroundImage && (
                <div className={styles.imageContainer}>
                    <img
                        src={slide.backgroundImage}
                        alt={slide.title}
                        className={styles.slideImage}
                    />
                </div>
            )}

            {/* Блок с контентом справа */}
            <div className={styles.contentContainer} ref={contentRef}>
                {/* Заголовок */}
                <h1 className={styles.slideTitle}>
                    {displayedTitle}
                    {currentStage === "title" && !isTypingComplete && (
                        <span className={styles.typeCursor}>|</span>
                    )}
                </h1>

                {/* Параграфы */}
                <div className={styles.slideText}>
                    {displayedParagraphs.map((paragraph, index) => (
                        <p key={index}>
                            {paragraph}
                            {currentStage === "content" &&
                                index === displayedParagraphs.length - 1 &&
                                !isTypingComplete && (
                                    <span className={styles.typeCursor}>|</span>
                                )}
                        </p>
                    ))}
                </div>

                {/* Поле автора */}
                {slide.authorName && (currentStage === "author" || displayedAuthor) && (
                    <div className={styles.authorField}>
                        <label htmlFor="authorCheckbox">
                            {displayedAuthor}
                            {currentStage === "author" && !isTypingComplete && (
                                <span className={styles.typeCursor}>|</span>
                            )}
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};
