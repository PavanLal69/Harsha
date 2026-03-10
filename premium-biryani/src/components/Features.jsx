import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Flame, ChefHat, Truck } from 'lucide-react';

const Features = () => {
    const features = [
        { icon: <Leaf size={32} className="text-secondary" />, title: "Fresh Ingredients", desc: "Farm fresh vegetables and premium cuts of meat." },
        { icon: <Flame size={32} className="text-primary" />, title: "Authentic Spices", desc: "Hand-pounded spices imported from specific regions." },
        { icon: <ChefHat size={32} className="text-text-main" />, title: "Master Chefs", desc: "Decades of experience in traditional slow-cooking." },
        { icon: <Truck size={32} className="text-blue-500" />, title: "Fast Delivery", desc: "Delivered piping hot from our pot to your plate." },
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold text-text-main mb-4">Why Choose Us</h2>
                    <p className="text-text-main/70 max-w-2xl mx-auto">Experience the royal heritage of authentic biryani crafted with passion and precision.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((ft, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-3xl p-8 hover:shadow-2xl transition-all border border-gray-100/50 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6">
                                {ft.icon}
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3">{ft.title}</h3>
                            <p className="text-text-main/70 leading-relaxed text-sm">{ft.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
