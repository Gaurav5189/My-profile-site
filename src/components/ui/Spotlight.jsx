import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function Spotlight({
    className = "",
    size = 200,
    springOptions = { bounce: 0 },
}) {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [parentElement, setParentElement] = useState(null);

    const mouseX = useSpring(0, springOptions);
    const mouseY = useSpring(0, springOptions);

    const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
    const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

    useEffect(() => {
        if (containerRef.current) {
            const parent = containerRef.current.parentElement;
            if (parent) {
                const originalPosition = parent.style.position;
                const originalOverflow = parent.style.overflow;
                parent.style.position = 'relative';
                // Prevent spotlight effect from bleeding outside parent container
                parent.style.overflow = 'hidden';
                setParentElement(parent);

                return () => {
                    parent.style.position = originalPosition;
                    parent.style.overflow = originalOverflow;
                };
            }
        }
    }, []);

    const handleMouseMove = useCallback(
        (event) => {
            if (!parentElement) return;
            const { left, top } = parentElement.getBoundingClientRect();
            mouseX.set(event.clientX - left);
            mouseY.set(event.clientY - top);
        },
        [mouseX, mouseY, parentElement]
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    useEffect(() => {
        if (!parentElement) return;

        parentElement.addEventListener('mousemove', handleMouseMove);
        parentElement.addEventListener('mouseenter', handleMouseEnter);
        parentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            parentElement.removeEventListener('mousemove', handleMouseMove);
            parentElement.removeEventListener('mouseenter', handleMouseEnter);
            parentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [parentElement, handleMouseMove, handleMouseEnter, handleMouseLeave]);

    return (
        <motion.div
            ref={containerRef}
            className={className}
            style={{
                pointerEvents: 'none',
                position: 'absolute',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.4), rgba(255,255,255,0.1), transparent 80%)',
                filter: 'blur(30px)',
                transition: 'opacity 0.2s',
                opacity: isHovered ? 1 : 0,
                width: size,
                height: size,
                left: spotlightLeft,
                top: spotlightTop,
                zIndex: 10,
            }}
        />
    );
}

export default Spotlight;
