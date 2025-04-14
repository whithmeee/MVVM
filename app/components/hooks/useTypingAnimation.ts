// hooks/useTypingAnimation.ts
import { useState, useEffect, useRef, useCallback } from "react";
import {setLocalStorageItem} from "@/app/components/utils/storage";

type TypingStage = "title" | "content" | "author";

interface UseTypingAnimationProps {
    slideId: string;
    title: string;
    content: string[];
    authorName?: string;
    onTypingComplete?: () => void;
    chunkSize?: number;
    titleDelay?: number;
    textDelay?: number;
    authorDelay?: number;
}

export const useTypingAnimation = ({
                                       slideId,
                                       title,
                                       content,
                                       authorName,
                                       onTypingComplete,
                                       chunkSize = 5,
                                       titleDelay = 80,
                                       textDelay = 60,
                                       authorDelay = 100,
                                   }: UseTypingAnimationProps) => {
    const hasCompletedBefore = localStorage.getItem(`slide_${slideId}_completed`) === 'true';




    const [displayedTitle, setDisplayedTitle] = useState(hasCompletedBefore ? title : "");
    const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>(
        hasCompletedBefore ? content : []
    );
    const [displayedAuthor, setDisplayedAuthor] = useState(
        hasCompletedBefore ? authorName || "" : ""
    );
    const [currentStage, setCurrentStage] = useState<TypingStage>(
        hasCompletedBefore ? "author" : "title"
    );
    const [skipAnimation, setSkipAnimation] = useState(hasCompletedBefore);
    const contentRef = useRef<HTMLDivElement>(null);

    const completeAnimation = useCallback(() => {
        localStorage.setItem(`slide_${slideId}_completed`, 'true');
        onTypingComplete?.();
    }, [slideId, onTypingComplete]);


    // Инициализация для уже завершенных анимаций
    useEffect(() => {
        if (hasCompletedBefore) {
            setDisplayedTitle(title);
            setDisplayedParagraphs(content);
            if (authorName) setDisplayedAuthor(authorName);
            onTypingComplete?.();
        }
    }, [hasCompletedBefore, title, content, authorName, onTypingComplete]);

    // Анимация заголовка
    useEffect(() => {
        if (skipAnimation || currentStage !== "title") return;

        let currentIndex = 0;
        const titleInterval = setInterval(() => {
            currentIndex += chunkSize;
            setDisplayedTitle(title.slice(0, currentIndex));

            if (currentIndex >= title.length) {
                clearInterval(titleInterval);
                setCurrentStage("content");
                setDisplayedParagraphs([""]);
            }
        }, titleDelay);

        return () => clearInterval(titleInterval);
    }, [skipAnimation, currentStage, title, chunkSize, titleDelay]);

    // Анимация контента
    useEffect(() => {
        if (skipAnimation || currentStage !== "content" || displayedParagraphs.length === 0) return;

        const currentParaIndex = displayedParagraphs.length - 1;
        const currentPara = content[currentParaIndex] || "";
        let currentIndex = displayedParagraphs[currentParaIndex].length;

        const paraInterval = setInterval(() => {
            currentIndex += chunkSize;
            const newChunk = currentPara.slice(0, currentIndex);

            setDisplayedParagraphs(prev => [
                ...prev.slice(0, -1),
                newChunk
            ]);

            if (contentRef.current) {
                contentRef.current.scrollTop = contentRef.current.scrollHeight;
            }

            if (currentIndex >= currentPara.length) {
                clearInterval(paraInterval);

                if (currentParaIndex < content.length - 1) {
                    setDisplayedParagraphs(prev => [...prev, ""]);
                } else if (authorName) {
                    setCurrentStage("author");
                    setDisplayedAuthor("");
                } else {
                    completeAnimation();
                }
            }
        }, textDelay);

        return () => clearInterval(paraInterval);
    }, [skipAnimation, currentStage, displayedParagraphs, content, authorName, completeAnimation, chunkSize, textDelay]);

    // Анимация автора
    useEffect(() => {
        if (skipAnimation || currentStage !== "author" || !authorName) return;

        let currentIndex = 0;
        const authorInterval = setInterval(() => {
            currentIndex += chunkSize;
            setDisplayedAuthor(authorName.slice(0, currentIndex));

            if (currentIndex >= authorName.length) {
                clearInterval(authorInterval);
                completeAnimation();
            }
        }, authorDelay);

        return () => clearInterval(authorInterval);
    }, [skipAnimation, currentStage, authorName, completeAnimation, chunkSize, authorDelay]);

    return {
        displayedTitle,
        displayedParagraphs,
        displayedAuthor,
        currentStage,
        skipAnimation,
        contentRef,
        isTypingComplete: hasCompletedBefore || skipAnimation,
    };
};
