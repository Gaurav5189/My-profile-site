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
    const intervalRef = useRef(null);
    const isScrambledRef = useRef(true); // Security lock: Only allow scramble if currently scrambled
    // Triggers unscramble when entering the middle 50% of the screen (crosses 75% from bottom, or 25% from top)
    const isTriggerZone = useInView(nodeRef, { once: false, margin: "-25% 0px -25% 0px" });

    // Triggers reset ONLY when completely off-screen by at least 100px (safety buffer)
    const isVisibleAtAll = useInView(nodeRef, { once: false, margin: "200px 0px 200px 0px" });

    const [displayText, setDisplayText] = useState(children);
    const text = String(children);

    const scramble = () => {
        const steps = duration / speed;
        let step = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
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
                clearInterval(intervalRef.current);
                setDisplayText(text);
                onScrambleComplete?.();
            }
        }, speed * 1000);
    };

    useEffect(() => {
        // If it's completely out of the viewport bounds (+200px), reset it silently to gibberish
        if (!isVisibleAtAll) {
            if (intervalRef.current) clearInterval(intervalRef.current);

            let initialGibberish = '';
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ' || text[i] === '\n') {
                    initialGibberish += text[i];
                } else {
                    initialGibberish += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }
            setDisplayText(initialGibberish);
            isScrambledRef.current = true; // Lock opened: Text is officially scrambled
            return;
        }

        // If it crossed into the middle 50% target zone AND is currently scrambled, trigger it!
        if (isTriggerZone) {
            if (isScrambledRef.current) {
                isScrambledRef.current = false; // Lock immediately closed: Animation has spent its token
                scramble();
            }
        }

        // If it leaves the target zone but is still isVisibleAtAll (i.e., exiting the screen),
        // we deliberately do NOTHING! This keeps the text readable while leaving the frame.

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isTriggerZone, isVisibleAtAll, text, characterSet, duration, speed]);

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
