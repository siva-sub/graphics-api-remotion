// Context-Based Graphics Selection
// Maps storyline concepts to relevant graphics

export interface StoryContext {
    scene?: string;
    action?: string;
    emotion?: string;
    subject?: string;
    setting?: string;
}

// Keyword to icon/illustration mappings
export const CONTEXT_MAPPINGS = {
    // Actions
    actions: {
        'send': ['arrow-right', 'send', 'paper-plane', 'mail'],
        'receive': ['arrow-left', 'inbox', 'download'],
        'upload': ['upload', 'cloud-upload', 'arrow-up'],
        'download': ['download', 'cloud-download', 'arrow-down'],
        'pay': ['credit-card', 'wallet', 'money', 'dollar-sign'],
        'buy': ['shopping-cart', 'bag', 'credit-card'],
        'search': ['magnifying-glass', 'search', 'zoom-in'],
        'login': ['log-in', 'user', 'key', 'lock'],
        'logout': ['log-out', 'door-open', 'exit'],
        'share': ['share', 'share-2', 'external-link'],
        'like': ['heart', 'thumbs-up', 'star'],
        'save': ['bookmark', 'heart', 'save', 'floppy-disk'],
        'delete': ['trash', 'x', 'trash-2'],
        'edit': ['pencil', 'edit', 'pen'],
        'add': ['plus', 'plus-circle', 'add'],
        'remove': ['minus', 'x', 'trash'],
        'sync': ['refresh', 'sync', 'arrows-clockwise'],
        'connect': ['link', 'plug', 'wifi'],
        'disconnect': ['unlink', 'plug-off', 'wifi-off'],
        'approve': ['check', 'check-circle', 'thumbs-up'],
        'reject': ['x', 'x-circle', 'thumbs-down'],
        'celebrate': ['party', 'confetti', 'trophy', 'star'],
        'work': ['briefcase', 'laptop', 'desktop'],
        'code': ['code', 'terminal', 'brackets'],
        'build': ['hammer', 'wrench', 'tool'],
        'deploy': ['rocket', 'cloud', 'server'],
        'secure': ['lock', 'shield', 'key'],
    },

    // Subjects/Objects
    subjects: {
        'user': ['user', 'person', 'avatar'],
        'team': ['users', 'people', 'group'],
        'money': ['dollar-sign', 'wallet', 'credit-card', 'coins'],
        'payment': ['credit-card', 'wallet', 'bank'],
        'message': ['message-circle', 'chat', 'envelope', 'mail'],
        'email': ['envelope', 'mail', 'at-sign'],
        'notification': ['bell', 'alert', 'notification'],
        'settings': ['gear', 'settings', 'sliders'],
        'file': ['file', 'document', 'file-text'],
        'folder': ['folder', 'folder-open'],
        'image': ['image', 'photo', 'camera'],
        'video': ['video', 'play', 'film'],
        'audio': ['volume', 'speaker', 'headphones'],
        'calendar': ['calendar', 'clock', 'schedule'],
        'location': ['map-pin', 'location', 'globe'],
        'chart': ['chart', 'bar-chart', 'trending-up'],
        'database': ['database', 'server', 'hard-drive'],
        'api': ['code', 'plug', 'layers'],
        'security': ['shield', 'lock', 'key'],
        'success': ['check', 'trophy', 'star', 'celebrate'],
        'error': ['x', 'alert-triangle', 'alert-circle'],
        'warning': ['alert-triangle', 'alert', 'exclamation'],
        'info': ['info', 'help-circle', 'question-mark'],
    },

    // Emotions/States
    emotions: {
        'happy': ['smile', 'heart', 'sun', 'star'],
        'sad': ['frown', 'cloud', 'rain'],
        'success': ['trophy', 'check', 'thumbs-up', 'star'],
        'failure': ['x', 'alert', 'thumbs-down'],
        'loading': ['loader', 'spinner', 'hourglass'],
        'waiting': ['clock', 'hourglass', 'timer'],
        'complete': ['check-circle', 'check', 'done'],
        'pending': ['clock', 'hourglass', 'pause'],
        'active': ['play', 'circle', 'radio'],
        'inactive': ['pause', 'stop', 'circle-off'],
    },

    // Settings/Environments
    settings: {
        'office': ['briefcase', 'building', 'desktop'],
        'home': ['house', 'home', 'sofa'],
        'cloud': ['cloud', 'server', 'database'],
        'mobile': ['smartphone', 'phone', 'tablet'],
        'web': ['globe', 'browser', 'layout'],
        'night': ['moon', 'star', 'dark'],
        'day': ['sun', 'light', 'bright'],
    },

    // Illustration themes (for Storyset/IRA)
    themes: {
        'business': ['meeting', 'presentation', 'teamwork', 'handshake'],
        'technology': ['coding', 'developer', 'computer', 'server'],
        'education': ['learning', 'book', 'graduation', 'student'],
        'health': ['doctor', 'medical', 'fitness', 'wellness'],
        'finance': ['money', 'bank', 'investment', 'trading'],
        'communication': ['chat', 'social', 'message', 'email'],
        'creative': ['design', 'art', 'creative', 'palette'],
        'startup': ['rocket', 'growth', 'innovation', 'idea'],
    }
} as const;

/**
 * Parse a storyline/context string and extract relevant keywords
 */
export function parseContext(input: string): StoryContext {
    const words = input.toLowerCase().split(/\s+/);
    const context: StoryContext = {};

    // Detect actions
    for (const word of words) {
        if (word in CONTEXT_MAPPINGS.actions) {
            context.action = word;
        }
        if (word in CONTEXT_MAPPINGS.subjects) {
            context.subject = word;
        }
        if (word in CONTEXT_MAPPINGS.emotions) {
            context.emotion = word;
        }
        if (word in CONTEXT_MAPPINGS.settings) {
            context.setting = word;
        }
    }

    return context;
}

/**
 * Get recommended icon names for a context
 */
export function getIconsForContext(input: string | StoryContext): string[] {
    const context = typeof input === 'string' ? parseContext(input) : input;
    const icons: string[] = [];

    if (context.action && context.action in CONTEXT_MAPPINGS.actions) {
        icons.push(...CONTEXT_MAPPINGS.actions[context.action as keyof typeof CONTEXT_MAPPINGS.actions]);
    }

    if (context.subject && context.subject in CONTEXT_MAPPINGS.subjects) {
        icons.push(...CONTEXT_MAPPINGS.subjects[context.subject as keyof typeof CONTEXT_MAPPINGS.subjects]);
    }

    if (context.emotion && context.emotion in CONTEXT_MAPPINGS.emotions) {
        icons.push(...CONTEXT_MAPPINGS.emotions[context.emotion as keyof typeof CONTEXT_MAPPINGS.emotions]);
    }

    // Remove duplicates
    return [...new Set(icons)];
}

/**
 * Get illustration themes for a context
 */
export function getThemesForContext(input: string): string[] {
    const words = input.toLowerCase().split(/\s+/);
    const themes: string[] = [];

    for (const [theme, keywords] of Object.entries(CONTEXT_MAPPINGS.themes)) {
        if (words.some(word => (keywords as readonly string[]).includes(word) || word === theme)) {
            themes.push(theme);
        }
    }

    return themes.length > 0 ? themes : ['business']; // default
}
