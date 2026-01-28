// Graphics API Types

export type GraphicSource =
    | 'doodle-ipsum'
    | 'storyset'
    | 'ira-design'
    | 'phosphor'
    | 'lucide'
    | 'iconoodle';

export interface GraphicResult {
    url: string;
    svg?: string;
    width?: number;
    height?: number;
    source: GraphicSource;
    metadata?: Record<string, unknown>;
}

// Doodle Ipsum
export type DoodleStyle = 'flat' | 'hand-drawn' | 'outlined' | 'abstract';

export interface DoodleIpsumOptions {
    width?: number;
    height?: number;
    style?: DoodleStyle;
    id?: number;
    seed?: number;
    background?: string;
}

// Storyset
export type StorysetCategory =
    | 'business'
    | 'coding'
    | 'education'
    | 'health'
    | 'people'
    | 'technology';

export type StorysetStyle = 'rafiki' | 'bro' | 'amico' | 'pana' | 'cuate';

export interface StorysetOptions {
    category?: StorysetCategory;
    style?: StorysetStyle;
    color?: string;
    search?: string;
}

// IRA Design
export type IRACategory = 'characters' | 'objects' | 'backgrounds';

export interface IRADesignOptions {
    category?: IRACategory;
    name?: string;
    colors?: {
        primary?: string;
        secondary?: string;
        accent?: string;
    };
}

// Phosphor Icons
export type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface PhosphorOptions {
    name: string;
    weight?: PhosphorWeight;
    size?: number;
    color?: string;
}

// Lucide Icons
export interface LucideOptions {
    name: string;
    size?: number;
    color?: string;
    strokeWidth?: number;
}

// Iconoodle
export interface IconoodleOptions {
    pack?: string;
    name: string;
    color?: string;
}

// Unified API
export interface GraphicsAPIOptions {
    source: GraphicSource;
    options: DoodleIpsumOptions | StorysetOptions | IRADesignOptions | PhosphorOptions | LucideOptions | IconoodleOptions;
}
