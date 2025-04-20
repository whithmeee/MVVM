import {ReactNode} from "react";


export function PresentationLayout({children, params}: {
    children: ReactNode;
    params?: { slides: number; lang: string };
}) {
    return (
        <div className="presentation">
            <header>
                <h1>{params ? "Структура презентации" : "Создание презентации"}</h1>
                <div className="params">
                    <span>{params?.slides || 8} слайдов</span>
                    <span>Оптимально</span>
                    <span>{params?.lang || "Русский"}</span>
                </div>
            </header>
            {children}
        </div>
    );
}
