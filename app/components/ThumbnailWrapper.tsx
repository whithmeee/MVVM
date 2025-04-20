"use client";
import styles from './Thumbnail.module.css';
import React from "react";

export const ThumbnailWrapper = ({children,isActive,onClick}: {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            className={`${styles.thumbnailContainer} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            <div className={styles.thumbnailContent}>
                {children}
            </div>
        </div>
    );
};
