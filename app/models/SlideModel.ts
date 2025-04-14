export type SlideType =
    | 'slide_intro'    // Вступительный слайд
    | 'slide_content'   // Контентный слайд
    | 'slide_image'     // Слайд с изображением
    | 'slide_split';    // Разделенный слайд

export class SlideModel {
    constructor(
        public id: string,
        public title: string,
        public content: string[],
        public type: SlideType = 'slide_intro',
        public authorName?: string,  // Для поля "Имя Фамилия"
        public backgroundImage?: string
    ) {}
}
