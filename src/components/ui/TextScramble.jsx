import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export function TextScramble({
    children,
    duration = 0.9,
    speed = 0.04,
    characterSet = defaultChars,
    className = "",
    as: Component = 'span',
    onScrambleComplete,
    ...props
}) {
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -25% 0px" });

    const [displayText, setDisplayText] = useState(children);
    const [isAnimating, setIsAnimating] = useState(false);
    const text = String(children);

    const scramble = async () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const steps = duration / speed;
        let step = 0;

        const interval = setInterval(() => {
            let scrambled = '';
            const progress = step / steps;

            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ' || text[i] === '\n') {
                    scrambled += text[i];
                    continue;
                }

                if (progress * text.length > i) {
                    scrambled += text[i];
                } else {
                    scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }

            setDisplayText(scrambled);
            step++;

            if (step > steps) {
                clearInterval(interval);
                setDisplayText(text);
                setIsAnimating(false);
                onScrambleComplete?.();
            }
        }, speed * 1000);
    };

    useEffect(() => {
        if (!isInView) {
            // Pre-fill with gibberish so it looks like hacker code when it becomes visible before scrambling
            let initialGibberish = '';
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ' || text[i] === '\n') {
                    initialGibberish += text[i];
                } else {
                    initialGibberish += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }
            setDisplayText(initialGibberish);
            return;
        }

        // It crossed the 75% screen line — immediately resolve!
        scramble();
    }, [isInView]);

    return (
        <Component
            ref={nodeRef}
            className={className}
            {...props}
            style={{ position: 'relative', display: 'inline-block', ...props.style }}
        >
            {/* Invisible original text acts as a strict structural dummy, locking in the final exact width/height 
                so the layout never shifts, pushes, or jumps while characters scramble. */}
            <span style={{ visibility: 'hidden' }}>{text}</span>

            {/* The actual visible scrambling text is absolutely positioned directly over the dummy space. */}
            <span style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', whiteSpace: 'nowrap' }}>
                {displayText}
            </span>
        </Component>
    );
}

export default TextScramble;
