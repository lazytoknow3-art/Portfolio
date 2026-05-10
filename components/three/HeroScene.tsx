"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

function ButterflyShape({ flap }: { flap: boolean }) {
    return (
        <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
            <motion.ellipse cx="20" cy="18" rx="18" ry="13" fill="#C1440E" opacity={0.85}
                animate={{ scaleX: flap ? 0.35 : 1 }} transition={{ duration: 0.15 }}
                style={{ transformOrigin: "32px 24px" }} />
            <motion.ellipse cx="44" cy="18" rx="18" ry="13" fill="#E8886A" opacity={0.85}
                animate={{ scaleX: flap ? 0.35 : 1 }} transition={{ duration: 0.15 }}
                style={{ transformOrigin: "32px 24px" }} />
            <motion.ellipse cx="22" cy="34" rx="12" ry="9" fill="#C1440E" opacity={0.7}
                animate={{ scaleX: flap ? 0.3 : 1 }} transition={{ duration: 0.15 }}
                style={{ transformOrigin: "32px 24px" }} />
            <motion.ellipse cx="42" cy="34" rx="12" ry="9" fill="#E8886A" opacity={0.7}
                animate={{ scaleX: flap ? 0.3 : 1 }} transition={{ duration: 0.15 }}
                style={{ transformOrigin: "32px 24px" }} />
            <circle cx="22" cy="16" r="3" fill="#FAF7F2" opacity={0.5} />
            <circle cx="42" cy="16" r="3" fill="#FAF7F2" opacity={0.5} />
            <ellipse cx="32" cy="24" rx="3" ry="11" fill="#1C1C1C" opacity={0.8} />
            <path d="M30 14 Q26 6 22 4" stroke="#1C1C1C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.7} />
            <path d="M34 14 Q38 6 42 4" stroke="#1C1C1C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.7} />
            <circle cx="22" cy="4" r="1.5" fill="#C1440E" />
            <circle cx="42" cy="4" r="1.5" fill="#C1440E" />
        </svg>
    );
}

function Flower({ x, y, scale = 1 }: { x: string; y: string; scale?: number }) {
    return (
        <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -100%) scale(${scale})` }}>
            <svg width="48" height="64" viewBox="0 0 48 64" fill="none">
                <path d="M24 64 Q22 48 24 36" stroke="#3B5249" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <ellipse key={i}
                        cx={24 + Math.cos((deg * Math.PI) / 180) * 10}
                        cy={20 + Math.sin((deg * Math.PI) / 180) * 10}
                        rx="7" ry="5"
                        fill={i % 2 === 0 ? "#E8886A" : "#C1440E"}
                        opacity={0.85}
                        transform={`rotate(${deg}, ${24 + Math.cos((deg * Math.PI) / 180) * 10}, ${20 + Math.sin((deg * Math.PI) / 180) * 10})`}
                    />
                ))}
                <circle cx="24" cy="20" r="6" fill="#FAF7F2" />
                <circle cx="24" cy="20" r="3" fill="#C1440E" opacity={0.6} />
            </svg>
        </div>
    );
}

function sleep(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
}

export default function HeroScene() {
    const controls = useAnimationControls();
    const [flap, setFlap] = useState(false);
    const cancelledRef = useRef(false);
    const flapIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startFlap = () => {
        flapIntervalRef.current = setInterval(() => {
            setFlap((f) => !f);
        }, 160);
    };

    const stopFlap = () => {
        if (flapIntervalRef.current) {
            clearInterval(flapIntervalRef.current);
            flapIntervalRef.current = null;
        }
        setFlap(false);
    };

    useEffect(() => {
        cancelledRef.current = false;

        async function loop() {
            while (!cancelledRef.current) {
                // Reset to left off-screen
                controls.set({ x: "-80px", y: "28vh", rotate: 0, opacity: 0 });
                await controls.start({ opacity: 1, transition: { duration: 0.4 } });

                startFlap();

                // Fly across with wavy motion
                await controls.start({
                    x: ["−80px", "15vw", "35vw", "52vw", "68vw", "78vw"],
                    y: ["28vh", "20vh", "34vh", "16vh", "26vh", "36vh"],
                    rotate: [0, -10, 6, -12, 5, 0],
                    transition: {
                        duration: 5.5,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    },
                });

                // Descend onto flower
                await controls.start({
                    y: "42vh",
                    rotate: 0,
                    transition: { duration: 0.7, ease: "easeOut" },
                });

                stopFlap();

                // Idle on flower — slow occasional flap
                for (let i = 0; i < 5; i++) {
                    if (cancelledRef.current) break;
                    setFlap(true);
                    await sleep(250);
                    setFlap(false);
                    await sleep(600);
                }

                // Take off right
                startFlap();
                await controls.start({
                    x: "110vw",
                    y: "18vh",
                    rotate: -18,
                    opacity: 0,
                    transition: { duration: 2.2, ease: "easeIn" },
                });
                stopFlap();

                await sleep(1800);
            }
        }

        loop();

        return () => {
            cancelledRef.current = true;
            stopFlap();
        };
    }, [controls]);

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Flower cluster on the right */}
            <Flower x="82vw" y="48vh" scale={1.1} />
            <Flower x="78vw" y="52vh" scale={0.8} />
            <Flower x="86vw" y="50vh" scale={0.9} />

            {/* Butterfly */}
            <motion.div animate={controls} style={{ position: "absolute", top: 0, left: 0 }}>
                <ButterflyShape flap={flap} />
            </motion.div>
        </div>
    );
}
