// Animated Icon Component for Remotion
// Icon with scale, rotation, and color animations

import type { CSSProperties } from 'react';
import type { GraphicResult } from '../types.js';

export interface AnimatedIconProps {
    graphic: GraphicResult;
    animation?: 'pulse' | 'spin' | 'bounce' | 'wiggle' | 'none';
    color?: string;
    size?: number;
    style?: CSSProperties;
}

// Note: This component requires React and Remotion at runtime
// Import in your Remotion project:
// import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Example usage in Remotion:
 * 
 * ```tsx
 * import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
 * 
 * export const AnimatedIcon: FC<AnimatedIconProps> = ({
 *   graphic,
 *   animation = 'none',
 *   color,
 *   size = 64,
 *   style
 * }) => {
 *   const frame = useCurrentFrame();
 *   const { fps } = useVideoConfig();
 * 
 *   const loopDuration = 30;
 *   const loopProgress = (frame % loopDuration) / loopDuration;
 * 
 *   const getAnimationStyle = () => {
 *     switch (animation) {
 *       case 'pulse': {
 *         const scale = interpolate(Math.sin(loopProgress * Math.PI * 2), [-1, 1], [0.9, 1.1]);
 *         return { transform: `scale(${scale})` };
 *       }
 *       case 'spin': return { transform: `rotate(${loopProgress * 360}deg)` };
 *       case 'bounce': {
 *         const y = Math.abs(Math.sin(loopProgress * Math.PI * 2)) * -20;
 *         return { transform: `translateY(${y}px)` };
 *       }
 *       case 'wiggle': {
 *         const rotation = Math.sin(loopProgress * Math.PI * 4) * 10;
 *         return { transform: `rotate(${rotation}deg)` };
 *       }
 *       default: return {};
 *     }
 *   };
 * 
 *   let svgContent = graphic.svg;
 *   if (svgContent && color) {
 *     svgContent = svgContent.replace(/currentColor/g, color);
 *     svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
 *     svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
 *   }
 * 
 *   const content = svgContent ? (
 *     <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ width: size, height: size }} />
 *   ) : (
 *     <img src={graphic.url} style={{ width: size, height: size, objectFit: 'contain' }} />
 *   );
 * 
 *   return (
 *     <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', ...getAnimationStyle(), ...style }}>
 *       {content}
 *     </div>
 *   );
 * };
 * ```
 */
export const AnimatedIconExample = `
See component documentation above for implementation.
Copy the example code into your Remotion project.
`;
