"use client";
import { useState, useEffect } from 'react';
import { ListItem } from "@/app/models/SlideModel";

type ContentType = string | string[] | ListItem[];

export const useTypingAnimation = (
    card: {
        title: string;
        content: ContentType;
        author?: string;
    },
    isActive: boolean,
    options?: {
        charsPerChunk?: number;
        speed?: number;
    }
) => {
    const { charsPerChunk = 5, speed = 200 } = options || {};
    const [phase, setPhase] = useState<'title' | 'content' | 'author' | 'complete'>('title');
    const [progress, setProgress] = useState({
        title: 0,
        content: 0,
        author: 0
    });

    const contentToString = (content: ContentType): string => {
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) {
            return content.map(item =>
                typeof item === 'string' ? item : `${item.title}\n${item.text}`
            ).join('\n');
        }
        return '';
    };

    const fullContent = contentToString(card.content);


    useEffect(() => {
        if (isActive) {
            setPhase('title');
            setProgress({
                title: 0,
                content: 0,
                author: 0
            });
        }
    }, [isActive]);

    useEffect(() => {
        if (!isActive || phase === 'complete') return;

        const timer = setTimeout(() => {
            setProgress(prev => {
                const newProgress = {...prev};

                if (phase === 'title') {
                    newProgress.title = Math.min(prev.title + charsPerChunk, card.title.length);
                    if (newProgress.title >= card.title.length) {
                        setPhase('content');
                    }
                }
                else if (phase === 'content') {
                    newProgress.content = Math.min(prev.content + charsPerChunk, fullContent.length);
                    if (newProgress.content >= fullContent.length) {
                        setPhase(card.author ? 'author' : 'complete');
                    }
                }
                else if (phase === 'author' && card.author) {
                    newProgress.author = Math.min(prev.author + charsPerChunk, card.author.length);
                    if (newProgress.author >= card.author.length) {
                        setPhase('complete');
                    }
                }

                return newProgress;
            });
        }, speed);

        return () => clearTimeout(timer);
    }, [isActive, phase, progress, card, fullContent, charsPerChunk, speed]);

    return {
        visibleTitle: card.title.slice(0, progress.title),
        visibleContent: fullContent.slice(0, progress.content),
        visibleAuthor: card.author?.slice(0, progress.author) || '',
        isComplete: phase === 'complete',
        currentPhase: phase
    };
};
