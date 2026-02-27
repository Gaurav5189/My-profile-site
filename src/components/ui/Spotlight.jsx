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
                parent.style.position = 'relative';
                // We don't strictly need overflow: hidden here if the parent defines it, 
                // but setting it helps ensure the spotlight doesn't bleed.
                parent.style.overflow = 'hidden';
                setParentElement(parent);
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

    useEffect(() => {
        if (!parentElement) return;

        parentElement.addEventListener('mousemove', handleMouseMove);
        parentElement.addEventListener('mouseenter', () => setIsHovered(true));
        parentElement.addEventListener('mouseleave', () => setIsHovered(false));

        return () => {
            parentElement.removeEventListener('mousemove', handleMouseMove);
            parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
            parentElement.removeEventListener('mouseleave', () =>
                setIsHovered(false)
            );
        };
    }, [parentElement, handleMouseMove]);

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
