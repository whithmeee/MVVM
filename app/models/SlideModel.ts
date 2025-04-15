export type SlideType =
    | 'title'
    | 'intro'

export type ListItem = {
    title: string;
    text: string;
    icon?: string;
};

export type SlideContent =
    | string
    | string[]
    | ListItem[];


export class SlideModel {
    constructor(
        public id: string,
        public title: string,
        public content: SlideContent,
        public type: SlideType = 'title',
        public authorName?: string,
        public backgroundImage?: string,
        public icon?:string
    ) {}
}
