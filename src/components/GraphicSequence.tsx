// Remotion Graphic Sequence Component
// Wrapper for graphics with enter/exit animations

import type { CSSProperties, FC } from 'react';
import type { GraphicResult } from '../types';

export interface GraphicSequenceProps {
    graphic: GraphicResult;
    enterAnimation?: 'fade' | 'scale' | 'slide' | 'none';
    exitAnimation?: 'fade' | 'scale' | 'slide' | 'none';
    enterDuration?: number;
    exitDuration?: number;
    style?: CSSProperties;
}

// Note: This component requires React and Remotion at runtime
// Import in your Remotion project:
// import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

/**
 * Example usage in Remotion:
 * 
 * ```tsx
 * import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
 * 
 * export const GraphicSequence: FC<GraphicSequenceProps> = ({
 *   graphic,
 *   enterAnimation = 'fade',
 *   exitAnimation = 'fade',
 *   enterDuration = 15,
 *   exitDuration = 15,
 *   style
 * }) => {
 *   const frame = useCurrentFrame();
 *   const { fps, durationInFrames } = useVideoConfig();
 * 
 *   const enterProgress = Math.min(frame / enterDuration, 1);
 *   const exitStart = durationInFrames - exitDuration;
 *   const exitProgress = frame > exitStart ? (frame - exitStart) / exitDuration : 0;
 * 
 *   const springConfig = { fps, damping: 12, stiffness: 100 };
 *   const enterSpring = spring({ frame, fps, config: springConfig, durationInFrames: enterDuration });
 * 
 *   const getEnterStyle = () => {
 *     switch (enterAnimation) {
 *       case 'fade': return { opacity: enterProgress };
 *       case 'scale': return { opacity: enterProgress, transform: `scale(${interpolate(enterSpring, [0, 1], [0.8, 1])})` };
 *       case 'slide': return { opacity: enterProgress, transform: `translateY(${interpolate(enterProgress, [0, 1], [30, 0])}px)` };
 *       default: return {};
 *     }
 *   };
 * 
 *   const content = graphic.svg ? (
 *     <div dangerouslySetInnerHTML={{ __html: graphic.svg }} style={{ width: '100%', height: '100%' }} />
 *   ) : (
 *     <Img src={graphic.url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
 *   );
 * 
 *   return (
 *     <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', ...getEnterStyle(), ...style }}>
 *       {content}
 *     </AbsoluteFill>
 *   );
 * };
 * ```
 */
export const GraphicSequenceExample = `
See component documentation above for implementation.
Copy the example code into your Remotion project.
`;
