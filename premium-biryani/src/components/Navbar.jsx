import React, { useState, useEffect } from 'react';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <div className="text-3xl font-heading font-bold text-primary tracking-tight">
                    Biryani.
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#home" className="text-text-main font-medium hover:text-primary transition-colors">Home</a>
                    <a href="#menu" className="text-text-main font-medium hover:text-primary transition-colors">Menu</a>
                    <a href="#contact" className="text-text-main font-medium hover:text-primary transition-colors">Contact</a>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <button className="text-text-main hover:text-primary transition-colors">
                        <User size={24} />
                    </button>
                    <button className="relative text-text-main hover:text-primary transition-colors">
                        <ShoppingCart size={24} />
                        <span className="absolute -top-1.5 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            3
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
