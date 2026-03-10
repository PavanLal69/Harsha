import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ingredients = [
    { emoji: "🍃", x: "15%", y: "22%", r: 15, delay: 0, s: 1.2 },
    { emoji: "🌶️", x: "8%", y: "60%", r: -25, delay: 1.2, s: 1.5 },
    { emoji: "🧅", x: "80%", y: "18%", r: 30, delay: 2.5, s: 1.3 },
    { emoji: "🥚", x: "85%", y: "45%", r: -15, delay: 0.8, s: 1.4 },
    { emoji: "🍅", x: "75%", y: "75%", r: 45, delay: 1.5, s: 1.2 },
    { emoji: "🍋", x: "22%", y: "82%", r: 10, delay: 3, s: 1.1 },
];

export default function FloatingIngredients() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();

    // Depth blur effect on scroll
    const blurEffect = useTransform(scrollYProgress, [0, 0.15], ["0px", "12px"]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]); // Fade out into background

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 60;
            const y = (window.innerHeight / 2 - e.clientY) / 60;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {ingredients.map((item, idx) => {
                const speed = (idx % 3) + 1;
                const pX = mousePos.x * speed;
                const pY = mousePos.y * speed;

                // "Ingredient Blast" effect calculated using angle based on position
                // Top-left ingredients blast top-left, bottom-right blast bottom-right
                const angle = Math.atan2(parseInt(item.y) - 50, parseInt(item.x) - 50);
                const blastDistanceX = Math.cos(angle) * (200 + idx * 50);
                const blastDistanceY = Math.sin(angle) * (200 + idx * 50);

                const blastX = useTransform(scrollYProgress, [0, 0.15], [0, blastDistanceX]);
                const blastY = useTransform(scrollYProgress, [0, 0.15], [0, blastDistanceY]);

                return (
                    <motion.div
                        key={idx}
                        className="absolute text-5xl filter drop-shadow-xl"
                        style={{
                            left: item.x,
                            top: item.y,
                            rotate: item.r,
                            scale: item.s,
                            x: useTransform(blastX, latest => latest + pX),
                            y: useTransform(blastY, latest => latest + pY),
                            opacity: opacityFade,
                            filter: `drop-shadow(0 20px 20px rgba(0,0,0,0.15)) blur(${idx % 2 === 0 ? blurEffect.get() : "0px"})`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [item.r, item.r + 15, item.r],
                        }}
                        transition={{
                            duration: 4 + idx,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: item.delay,
                        }}
                    >
                        {item.emoji}
                    </motion.div>
                );
            })}

            {/* CSS Rendered Ingredients */}
            <motion.div style={{ left: "28%", top: "32%", rotate: 60, scale: 0.8, x: useTransform(scrollYProgress, [0, 0.15], [0, -150]), y: useTransform(scrollYProgress, [0, 0.15], [0, -150]), opacity: opacityFade }} className="absolute drop-shadow-md">
                <div className="w-[8px] h-[45px] bg-gradient-to-b from-[#E3000F] to-[#FF7B00] rounded-[50%_50%_50%_50%/80%_80%_20%_20%]" />
            </motion.div>
            <motion.div style={{ left: "15%", top: "48%", rotate: -40, scale: 1.2, x: useTransform(scrollYProgress, [0, 0.15], [0, -200]), opacity: opacityFade }} className="absolute drop-shadow-xl">
                <div className="w-[18px] h-[70px] bg-gradient-to-r from-[#8b5a2b] via-[#a0522d] to-[#8b5a2b] rounded-md border-l-2 border-[#5c3a21]" />
            </motion.div>
            <motion.div style={{ right: "35%", top: "30%", rotate: 20, x: useTransform(scrollYProgress, [0, 0.15], [0, 150]), y: useTransform(scrollYProgress, [0, 0.15], [0, -100]), opacity: opacityFade }} className="absolute drop-shadow-lg">
                <div className="w-[25px] h-[40px] bg-gradient-to-br from-[#a4b47d] to-[#8F9E6C] rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-t border-[#c7d6a1]" />
            </motion.div>
        </div>
    );
}
