// Context-Based Graphics Selection
// Maps storyline concepts to relevant graphics
// Designed for AI agent self-service - describe your scene, get matching graphics

export interface StoryContext {
    scene?: string;
    action?: string;
    emotion?: string;
    subject?: string;
    setting?: string;
}

// Keyword to icon/illustration mappings
// AI agents: Use these keywords in your query() calls for best results
export const CONTEXT_MAPPINGS = {
    // === ACTIONS ===
    actions: {
        // Communication
        'send': ['arrow-right', 'send', 'paper-plane', 'mail'],
        'receive': ['arrow-left', 'inbox', 'download'],
        'message': ['message-circle', 'chat', 'comment'],
        'email': ['envelope', 'mail', 'at-sign'],
        'call': ['phone', 'phone-call', 'video'],
        'notify': ['bell', 'notification', 'megaphone'],

        // Data
        'upload': ['upload', 'cloud-upload', 'arrow-up'],
        'download': ['download', 'cloud-download', 'arrow-down'],
        'save': ['bookmark', 'save', 'floppy-disk', 'check'],
        'delete': ['trash', 'x', 'trash-2'],
        'edit': ['pencil', 'edit', 'pen'],
        'copy': ['copy', 'clipboard', 'duplicate'],
        'paste': ['clipboard', 'paste'],
        'sync': ['refresh', 'sync', 'arrows-clockwise'],
        'import': ['download', 'import', 'arrow-down-to-line'],
        'export': ['upload', 'export', 'arrow-up-from-line'],

        // User Actions
        'login': ['log-in', 'user', 'key', 'lock'],
        'logout': ['log-out', 'door-open', 'exit'],
        'signup': ['user-plus', 'add-user', 'register'],
        'register': ['user-plus', 'clipboard-list', 'form'],
        'subscribe': ['bell', 'mail', 'rss'],
        'share': ['share', 'share-2', 'external-link'],
        'like': ['heart', 'thumbs-up', 'star'],
        'comment': ['message-circle', 'chat', 'comment'],
        'follow': ['user-plus', 'heart', 'bell'],

        // Commerce
        'pay': ['credit-card', 'wallet', 'money', 'dollar-sign'],
        'buy': ['shopping-cart', 'bag', 'credit-card'],
        'sell': ['tag', 'store', 'dollar-sign'],
        'checkout': ['shopping-cart', 'credit-card', 'check'],
        'refund': ['arrow-left', 'dollar-sign', 'receipt'],
        'transfer': ['arrows-left-right', 'send', 'bank'],

        // Search/Navigation
        'search': ['magnifying-glass', 'search', 'zoom-in'],
        'filter': ['filter', 'sliders', 'funnel'],
        'sort': ['arrow-up-down', 'bars', 'list'],
        'navigate': ['compass', 'map', 'navigation'],
        'browse': ['layout', 'grid', 'columns'],

        // CRUD
        'add': ['plus', 'plus-circle', 'add'],
        'create': ['plus', 'file-plus', 'sparkle'],
        'update': ['pencil', 'refresh', 'edit'],
        'remove': ['minus', 'x', 'trash'],
        'view': ['eye', 'view', 'monitor'],

        // Work/Process
        'work': ['briefcase', 'laptop', 'desktop'],
        'code': ['code', 'terminal', 'brackets', 'laptop'],
        'build': ['hammer', 'wrench', 'tool', 'cog'],
        'deploy': ['rocket', 'cloud', 'server', 'upload'],
        'ship': ['rocket', 'package', 'truck'],
        'launch': ['rocket', 'sparkle', 'play'],
        'test': ['flask', 'check-circle', 'bug'],
        'debug': ['bug', 'code', 'search'],
        'review': ['eye', 'check', 'clipboard'],
        'approve': ['check', 'check-circle', 'thumbs-up'],
        'reject': ['x', 'x-circle', 'thumbs-down'],

        // Security
        'secure': ['lock', 'shield', 'key'],
        'encrypt': ['lock', 'key', 'shield'],
        'authenticate': ['fingerprint', 'key', 'lock'],
        'authorize': ['check-shield', 'user-check', 'key'],
        'protect': ['shield', 'lock', 'guard'],

        // Collaboration
        'collaborate': ['users', 'handshake', 'link'],
        'meet': ['video', 'users', 'calendar'],
        'discuss': ['message-circle', 'users', 'chat'],
        'brainstorm': ['lightbulb', 'brain', 'sparkle'],
        'present': ['presentation', 'monitor', 'play'],
        'celebrate': ['party', 'confetti', 'trophy', 'star'],

        // AI/Automation
        'generate': ['sparkle', 'wand', 'magic'],
        'analyze': ['chart', 'trending-up', 'bar-chart'],
        'predict': ['trending-up', 'crystal-ball', 'chart'],
        'automate': ['cog', 'robot', 'zap'],
        'optimize': ['trending-up', 'sliders', 'gauge'],
        'learn': ['brain', 'graduation-cap', 'book'],
    },

    // === SUBJECTS/OBJECTS ===
    subjects: {
        // People
        'user': ['user', 'person', 'avatar'],
        'users': ['users', 'people', 'group'],
        'team': ['users', 'people', 'group'],
        'customer': ['user', 'shopping-bag', 'heart'],
        'admin': ['user-cog', 'shield', 'settings'],
        'developer': ['code', 'terminal', 'laptop'],
        'designer': ['palette', 'pen-tool', 'layout'],

        // Finance
        'money': ['dollar-sign', 'wallet', 'credit-card', 'coins'],
        'payment': ['credit-card', 'wallet', 'bank'],
        'invoice': ['file-text', 'receipt', 'dollar-sign'],
        'transaction': ['arrows-left-right', 'credit-card', 'receipt'],
        'subscription': ['repeat', 'calendar', 'credit-card'],
        'revenue': ['trending-up', 'dollar-sign', 'chart'],
        'expense': ['trending-down', 'receipt', 'wallet'],

        // Communication
        'message': ['message-circle', 'chat', 'envelope', 'mail'],
        'notification': ['bell', 'alert', 'notification'],
        'email': ['envelope', 'mail', 'at-sign'],
        'chat': ['message-circle', 'messages', 'comment'],

        // Data
        'file': ['file', 'document', 'file-text'],
        'folder': ['folder', 'folder-open'],
        'document': ['file-text', 'document', 'page'],
        'image': ['image', 'photo', 'camera'],
        'video': ['video', 'play', 'film'],
        'audio': ['volume', 'speaker', 'headphones'],
        'data': ['database', 'server', 'chart'],

        // Time
        'calendar': ['calendar', 'clock', 'schedule'],
        'deadline': ['calendar', 'alert', 'clock'],
        'schedule': ['calendar', 'clock', 'list'],
        'reminder': ['bell', 'clock', 'alarm'],

        // Technical
        'settings': ['gear', 'settings', 'sliders'],
        'config': ['sliders', 'settings', 'cog'],
        'api': ['code', 'plug', 'layers', 'brackets'],
        'database': ['database', 'server', 'hard-drive'],
        'server': ['server', 'cloud', 'database'],
        'code': ['code', 'brackets', 'terminal'],
        'bug': ['bug', 'alert', 'x-circle'],
        'feature': ['sparkle', 'star', 'plus'],

        // Status
        'success': ['check', 'trophy', 'star', 'celebrate'],
        'error': ['x', 'alert-triangle', 'alert-circle'],
        'warning': ['alert-triangle', 'alert', 'exclamation'],
        'info': ['info', 'help-circle', 'question-mark'],
        'loading': ['loader', 'spinner', 'hourglass'],
        'progress': ['loader', 'bar-chart', 'trending-up'],

        // Security
        'password': ['key', 'lock', 'eye-off'],
        'security': ['shield', 'lock', 'key'],
        'permission': ['key', 'check', 'lock'],
        'location': ['map-pin', 'location', 'globe'],

        // Analytics
        'chart': ['chart', 'bar-chart', 'trending-up'],
        'metric': ['gauge', 'chart', 'trending-up'],
        'report': ['file-text', 'chart', 'clipboard'],
        'dashboard': ['layout', 'grid', 'chart'],
        'insight': ['lightbulb', 'chart', 'eye'],
    },

    // === EMOTIONS/STATES ===
    emotions: {
        'happy': ['smile', 'heart', 'sun', 'star'],
        'excited': ['sparkle', 'star', 'zap', 'rocket'],
        'sad': ['frown', 'cloud', 'rain'],
        'angry': ['flame', 'alert', 'x'],
        'confused': ['help-circle', 'question-mark', 'maze'],
        'success': ['trophy', 'check', 'thumbs-up', 'star'],
        'failure': ['x', 'alert', 'thumbs-down'],
        'loading': ['loader', 'spinner', 'hourglass'],
        'waiting': ['clock', 'hourglass', 'timer'],
        'complete': ['check-circle', 'check', 'done'],
        'pending': ['clock', 'hourglass', 'pause'],
        'active': ['play', 'circle', 'radio'],
        'inactive': ['pause', 'stop', 'circle-off'],
        'urgent': ['alert', 'zap', 'clock'],
        'important': ['star', 'flag', 'alert'],
        'new': ['sparkle', 'star', 'badge'],
        'trending': ['trending-up', 'flame', 'chart'],
    },

    // === SETTINGS/ENVIRONMENTS ===
    settings: {
        'office': ['briefcase', 'building', 'desktop'],
        'home': ['house', 'home', 'sofa'],
        'remote': ['laptop', 'wifi', 'globe'],
        'cloud': ['cloud', 'server', 'database'],
        'mobile': ['smartphone', 'phone', 'tablet'],
        'web': ['globe', 'browser', 'layout'],
        'desktop': ['monitor', 'computer', 'display'],
        'night': ['moon', 'star', 'dark'],
        'day': ['sun', 'light', 'bright'],
        'outdoor': ['sun', 'tree', 'mountain'],
        'indoor': ['home', 'building', 'sofa'],
    },

    // === ILLUSTRATION THEMES (Storyset) ===
    themes: {
        'business': ['meeting', 'presentation', 'teamwork', 'handshake', 'office', 'corporate'],
        'technology': ['coding', 'developer', 'computer', 'server', 'api', 'software', 'code', 'tech'],
        'education': ['learning', 'book', 'graduation', 'student', 'school', 'study', 'course'],
        'health': ['doctor', 'medical', 'fitness', 'wellness', 'hospital', 'health'],
        'finance': ['money', 'bank', 'investment', 'trading', 'payment', 'wallet', 'credit'],
        'communication': ['chat', 'social', 'message', 'email', 'call', 'connect'],
        'creative': ['design', 'art', 'creative', 'palette', 'draw', 'illustration'],
        'startup': ['rocket', 'growth', 'innovation', 'idea', 'launch', 'entrepreneur'],
        'ecommerce': ['shopping', 'cart', 'store', 'product', 'buy', 'sell', 'checkout'],
        'security': ['lock', 'shield', 'protect', 'secure', 'privacy', 'authentication'],
        'analytics': ['chart', 'data', 'analysis', 'report', 'dashboard', 'metrics'],
        'social': ['social', 'network', 'community', 'share', 'like', 'follow'],
        'travel': ['travel', 'flight', 'vacation', 'trip', 'adventure', 'explore'],
        'food': ['food', 'restaurant', 'cooking', 'recipe', 'meal', 'delivery'],
        'nature': ['nature', 'environment', 'plant', 'eco', 'green', 'sustainability'],
    },

    // === ICONOODLE PACK MAPPINGS ===
    // AI agents: Use these to select the right Iconoodle pack
    iconoodlePacks: {
        'animal': 'doodles-cute-animals',
        'animals': 'doodles-cute-animals',
        'pet': 'doodles-cute-animals',
        'cat': 'doodles-cute-animals',
        'dog': 'doodles-cute-animals',
        'food': 'doodles-fast-food-doodle-art',
        'restaurant': 'doodles-fast-food-doodle-art',
        'pizza': 'doodles-fast-food-doodle-art',
        'coffee': 'doodles-hand-drawn-lifestyle-doodle',
        'lifestyle': 'doodles-hand-drawn-lifestyle-doodle',
        'home': 'doodles-hand-drawn-lifestyle-doodle',
        'christmas': 'christmas-illustration',
        'holiday': 'christmas-illustration',
        'festive': 'christmas-illustration',
        'fruit': 'doodles-fruits-vegetables-doodle',
        'vegetable': 'doodles-fruits-vegetables-doodle',
        'produce': 'doodles-fruits-vegetables-doodle',
        'school': 'doodles-educational-doodles',
        'education': 'doodles-educational-doodles',
        'learning': 'doodles-educational-doodles',
        'internet': 'doodles-internet-network-doodles',
        'network': 'doodles-internet-network-doodles',
        'tech': 'doodles-internet-network-doodles',
        'ai': 'doodles-ai-icon-doodles',
        'robot': 'doodles-ai-icon-doodles',
        'machine': 'doodles-ai-icon-doodles',
        'car': 'cars-icons',
        'vehicle': 'cars-icons',
        'drive': 'cars-icons',
        'candy': 'candy-icons',
        'sweet': 'candy-icons',
        'colorful': 'candy-icons',
        'shape': '3d-like-shape-doodles',
        '3d': '3d-like-shape-doodles',
        'geometric': '3d-like-shape-doodles',
        'brutalist': 'brutalist-doodles',
        'bold': 'brutalist-doodles',
        'minimal': 'brutalist-doodles',
    },
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

/**
 * Get recommended Iconoodle pack for a context
 * Used by AI agents to select the right doodle pack
 */
export function getIconoodlePackForContext(input: string): string {
    const words = input.toLowerCase().split(/\s+/);

    for (const word of words) {
        if (word in CONTEXT_MAPPINGS.iconoodlePacks) {
            return CONTEXT_MAPPINGS.iconoodlePacks[word as keyof typeof CONTEXT_MAPPINGS.iconoodlePacks];
        }
    }

    return 'doodles'; // default main pack
}
