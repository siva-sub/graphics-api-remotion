// Tag Taxonomy for Semantic Search

export const TAXONOMY = {
    categories: {
        business: [
            'meeting', 'presentation', 'chart', 'money', 'deal', 'handshake',
            'office', 'teamwork', 'strategy', 'growth', 'success', 'startup',
            'entrepreneur', 'investment', 'profit', 'sales', 'marketing'
        ],
        technology: [
            'coding', 'programming', 'laptop', 'computer', 'server', 'cloud',
            'robot', 'ai', 'data', 'network', 'software', 'developer', 'code',
            'api', 'database', 'security', 'cyber', 'tech', 'digital'
        ],
        people: [
            'team', 'person', 'individual', 'celebration', 'working', 'thinking',
            'happy', 'sad', 'walking', 'sitting', 'standing', 'running',
            'talking', 'group', 'crowd', 'family', 'friends', 'colleagues'
        ],
        education: [
            'book', 'graduation', 'classroom', 'study', 'learning', 'teaching',
            'school', 'university', 'student', 'teacher', 'knowledge', 'science',
            'reading', 'writing', 'exam', 'certificate', 'diploma'
        ],
        health: [
            'doctor', 'medicine', 'fitness', 'wellness', 'hospital', 'nurse',
            'exercise', 'yoga', 'meditation', 'mental', 'heart', 'healthy',
            'medical', 'care', 'therapy', 'nutrition'
        ],
        creative: [
            'art', 'design', 'music', 'paint', 'draw', 'creative', 'idea',
            'inspiration', 'color', 'brush', 'canvas', 'photography', 'video'
        ],
        nature: [
            'tree', 'flower', 'plant', 'animal', 'forest', 'mountain', 'ocean',
            'sun', 'moon', 'star', 'weather', 'environment', 'eco', 'green'
        ],
        communication: [
            'chat', 'message', 'email', 'phone', 'call', 'social', 'media',
            'notification', 'inbox', 'send', 'receive', 'broadcast'
        ]
    },

    styles: {
        flat: ['flat', 'simple', 'clean', 'minimal', 'modern'],
        'hand-drawn': ['hand-drawn', 'sketch', 'doodle', 'handmade', 'organic'],
        outlined: ['outlined', 'line', 'stroke', 'wireframe'],
        abstract: ['abstract', 'geometric', 'artistic'],
        '3d': ['3d', 'isometric', 'dimensional', 'perspective'],
        colorful: ['colorful', 'vibrant', 'bright', 'vivid'],
        dark: ['dark', 'night', 'moody', 'dramatic']
    },

    contentTypes: {
        icon: ['icon', 'symbol', 'glyph', 'pictogram', 'ui'],
        illustration: ['illustration', 'scene', 'artwork', 'picture', 'image'],
        doodle: ['doodle', 'sketch', 'scribble', 'hand-drawn'],
        character: ['character', 'person', 'avatar', 'figure', 'human']
    }
} as const;

// Source capabilities
export const SOURCE_CAPABILITIES = {
    'doodle-ipsum': {
        types: ['doodle', 'illustration'],
        styles: ['flat', 'hand-drawn', 'outlined', 'abstract'],
        categories: ['*'] // all categories
    },
    'storyset': {
        types: ['illustration', 'character'],
        styles: ['flat', 'colorful'],
        categories: ['business', 'technology', 'people', 'education', 'health']
    },
    'ira-design': {
        types: ['illustration', 'character'],
        styles: ['flat', 'colorful'],
        categories: ['business', 'people', 'technology']
    },
    'phosphor': {
        types: ['icon'],
        styles: ['outlined', 'flat'],
        categories: ['*']
    },
    'lucide': {
        types: ['icon'],
        styles: ['outlined'],
        categories: ['*']
    },
    'iconoodle': {
        types: ['icon', 'doodle'],
        styles: ['hand-drawn'],
        categories: ['*']
    }
} as const;

export type Category = keyof typeof TAXONOMY.categories;
export type Style = keyof typeof TAXONOMY.styles;
export type ContentType = keyof typeof TAXONOMY.contentTypes;
export type SourceName = keyof typeof SOURCE_CAPABILITIES;
