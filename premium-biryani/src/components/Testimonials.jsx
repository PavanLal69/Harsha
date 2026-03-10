import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const reviews = [
        {
            name: "Rahul S.",
            role: "Food Blogger",
            text: "The most authentic and aromatic biryani I've ever tasted outside of Hyderabad. The meat was tender and the rice was perfectly cooked.",
            rating: 5
        },
        {
            name: "Priya M.",
            role: "Regular Customer",
            text: "Their delivery is incredibly fast, and the food arrives piping hot. The blend of spices in the chicken dum biryani is just perfect.",
            rating: 5
        },
        {
            name: "Amit K.",
            role: "Local Chef",
            text: "You can tell they use premium ingredients. The saffron strands and high-quality basmati really elevate the entire dish.",
            rating: 4.5
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold text-text-main mb-4">What Our Guests Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="bg-background rounded-3xl p-8 shadow-sm flex flex-col"
                        >
                            <div className="flex gap-1 mb-6 text-secondary">
                                {"★".repeat(Math.floor(review.rating))}
                            </div>
                            <p className="text-text-main/80 italic mb-8 grow">"{review.text}"</p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold">{review.name}</h4>
                                    <p className="text-sm text-text-main/60">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
