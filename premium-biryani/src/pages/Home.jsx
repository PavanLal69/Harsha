import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import FloatingIngredients from '../components/FloatingIngredients';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Hero Text Animation
    const textY = useTransform(scrollYProgress, [0, 0.08], [0, -120]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

    // Hero Bowl scroll animation - scales down, rotates and moves toward card
    const heroScale = useTransform(scrollYProgress, [0, 0.12, 0.16], [1, 0.45, 0.28]);
    const heroY = useTransform(scrollYProgress, [0, 0.12, 0.16], ["0vh", "25vh", "35vh"]);
    const heroRotate = useTransform(scrollYProgress, [0, 0.16], [0, 20]);
    const heroX = useTransform(scrollYProgress, [0, 0.12, 0.16], ["0vw", "-15vw", "-28vw"]);
    // Hero bowl fades out right before it "reaches" the card
    const heroOpacity = useTransform(scrollYProgress, [0.13, 0.16], [1, 0]);

    // The card image fades IN at the exact moment the hero fades out (crossfade illusion)
    const cardImageOpacity = useTransform(scrollYProgress, [0.13, 0.16], [0, 1]);

    // Arrow opacity - hide arrows on scroll
    const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    // Menu Items Data
    const menuItems = [
        { id: 0, name: "Hyderabadi Biryani", price: "$14.99", rating: "4.9", image: "/biryani_1.png", desc: "Classic royal flavors with saffron and tender chicken." },
        { id: 1, name: "Chicken Dum Biryani", price: "$12.99", rating: "4.8", image: "/biryani_2.png", desc: "Slow-cooked in a sealed handi with rich aromatic spices." },
        { id: 2, name: "Mutton Biryani", price: "$16.99", rating: "4.9", image: "/biryani_3.png", desc: "Succulent mutton pieces marinated in secret spices." },
        { id: 3, name: "Paneer Biryani", price: "$11.99", rating: "4.7", image: "/biryani_4.png", desc: "Perfectly grilled paneer with peas and cashews." }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const nextBiryani = () => setCurrentIndex((prev) => (prev + 1) % menuItems.length);
    const prevBiryani = () => setCurrentIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
    const currentItem = menuItems[currentIndex];

    return (
        <div ref={containerRef} className="relative bg-white">
            <Navbar />

            {/* ==================== HERO SECTION ==================== */}
            <section id="home" className="relative min-h-[110vh] flex flex-col items-center justify-start pt-28 overflow-hidden bg-white">

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                {/* Carousel Arrows */}
                <motion.div
                    style={{ opacity: arrowOpacity }}
                    className="fixed top-[55%] w-full max-w-7xl mx-auto left-0 right-0 px-6 flex justify-between items-center z-40 pointer-events-none -translate-y-1/2"
                >
                    <button onClick={prevBiryani} className="pointer-events-auto bg-white/70 backdrop-blur-md p-4 rounded-full shadow-lg hover:bg-white transition-all text-text-main hover:text-primary hover:scale-110 active:scale-95">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={nextBiryani} className="pointer-events-auto bg-white/70 backdrop-blur-md p-4 rounded-full shadow-lg hover:bg-white transition-all text-text-main hover:text-primary hover:scale-110 active:scale-95">
                        <ChevronRight size={32} />
                    </button>
                </motion.div>

                {/* Hero Text */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="relative z-50 text-center px-4 max-w-4xl mx-auto"
                >
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${currentIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="text-5xl md:text-7xl font-heading font-extrabold text-text-main mb-6 leading-[1.1]"
                        >
                            {currentItem.name}
                        </motion.h1>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${currentIndex}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            className="text-lg md:text-xl text-text-main/90 font-medium mb-4 max-w-2xl mx-auto drop-shadow-sm"
                        >
                            {currentItem.desc}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>

                {/* FIXED Hero Biryani Bowl - animates toward menu card on scroll */}
                <motion.div
                    style={{
                        scale: heroScale,
                        y: heroY,
                        x: heroX,
                        rotate: heroRotate,
                        opacity: heroOpacity,
                    }}
                    className="fixed top-[52%] sm:top-[30%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[700px] md:h-[700px] pointer-events-none z-20 flex items-center justify-center mix-blend-multiply"
                >
                    {/* Soft shadow */}
                    <div className="absolute bottom-[-10px] w-[60%] h-[50px] bg-black/15 rounded-[50%] blur-2xl z-0" />

                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentIndex}
                            initial={{ x: 300, opacity: 0, rotate: 45 }}
                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                            exit={{ x: -300, opacity: 0, rotate: -45 }}
                            transition={{ type: "spring", stiffness: 120, damping: 18 }}
                            src={currentItem.image}
                            alt={currentItem.name}
                            className="w-full h-full object-contain mix-blend-multiply relative z-10"
                        />
                    </AnimatePresence>
                </motion.div>

                {/* Floating Ingredients */}
                <FloatingIngredients />
            </section>

            {/* ==================== MENU SECTION ==================== */}
            <section id="menu" className="relative z-20 py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-heading font-bold text-center mb-16"
                    >
                        Popular Biryani
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* FIRST CARD - selected biryani lands here via crossfade */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
                            className="bg-background rounded-3xl p-6 shadow-sm transition-all h-[420px] flex flex-col items-center justify-between ring-4 ring-primary/20"
                        >
                            {/* Image fades in as hero fades out */}
                            <motion.div
                                style={{ opacity: cardImageOpacity }}
                                className="w-full flex-1 relative flex items-center justify-center mix-blend-multiply"
                            >
                                <div className="absolute bottom-0 w-40 h-10 bg-black/10 rounded-[50%] blur-xl" />
                                <img
                                    src={currentItem.image}
                                    alt={currentItem.name}
                                    className="relative w-48 h-48 object-contain mix-blend-multiply z-10"
                                />
                            </motion.div>
                            <div className="w-full text-center mt-4">
                                <div className="flex justify-center mb-2 text-sm">⭐ {currentItem.rating} (120+)</div>
                                <h3 className="text-xl font-heading font-bold mb-2">{currentItem.name}</h3>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-xl font-bold text-primary">{currentItem.price}</span>
                                    <button className="bg-text-main text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary transition-colors">Add</button>
                                </div>
                            </div>
                        </motion.div>

                        {/* OTHER 3 CARDS */}
                        {menuItems.filter(item => item.id !== currentIndex).map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
                                whileHover={{ y: -10, scale: 1.03, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
                                className="bg-background rounded-3xl p-6 shadow-sm transition-all h-[420px] flex flex-col items-center justify-between cursor-pointer"
                                onClick={() => {
                                    setCurrentIndex(item.id);
                                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <div className="w-full flex-1 relative flex items-center justify-center mix-blend-multiply">
                                    <div className="absolute bottom-0 w-40 h-10 bg-black/10 rounded-[50%] blur-xl" />
                                    <img src={item.image} alt={item.name} className="relative w-48 h-48 object-contain mix-blend-multiply z-10" />
                                </div>
                                <div className="w-full text-center mt-4">
                                    <div className="flex justify-center mb-2 text-sm">⭐ {item.rating}</div>
                                    <h3 className="text-xl font-heading font-bold mb-2">{item.name}</h3>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-xl font-bold text-primary">{item.price}</span>
                                        <button className="bg-text-main text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary transition-colors">Add</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Features />
            <Testimonials />
            <Footer />
        </div>
    );
}
