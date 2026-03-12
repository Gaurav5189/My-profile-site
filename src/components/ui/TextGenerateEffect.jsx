import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

export const TextGenerateEffect = ({
    words = "",
    className = "",
    filter = true,
    duration = 0.5,
}) => {
    const [scope, animate] = useAnimate();
    // Trigger animation once when element enters viewport
    const isInView = useInView(scope, { once: true, margin: "0px 0px -20% 0px" });

    const wordsArray = words.split(" ");

    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                },
                {
                    duration: duration ? duration : 1,
                    delay: stagger(0.15),
                }
            );
        }
    }, [isInView, animate, duration, filter]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            style={{
                                opacity: 0,
                                filter: filter ? "blur(10px)" : "none",
                                display: "inline-block",
                                whiteSpace: "pre", // Preserve trailing spaces
                            }}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={className}>
            {renderWords()}
        </div>
    );
};

export default TextGenerateEffect;
