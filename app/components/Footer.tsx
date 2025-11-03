import { Separator } from '@radix-ui/themes';
import { motion } from 'motion/react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gray-950 border-t border-gray-800/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
                            {'<erickg.dev />'}
                        </h3>
                        <p className="text-gray-400">
                            Building the future, one line of code at a time.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-white mb-4">Quick Links</h4>
                        <nav className="space-y-2">
                            {['About', 'Skills', 'Experience', 'Contact'].map((item, index) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform hover:cursor-pointer"
                                >
                                    {item}
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-white mb-4">Contact</h4>
                        <div className="space-y-2 text-gray-400">
                            <p className="hover:text-blue-400 transition-colors cursor-pointer">erickgabrielalves0@gmail.com</p>
                            <p className="hover:text-blue-400 transition-colors cursor-pointer">+55 (14) 99777-8864</p>
                            <p className="hover:text-blue-400 transition-colors cursor-pointer">Barra Bonita, SP</p>
                        </div>
                    </motion.div>
                </div>

                <Separator className="bg-gray-800/50 mb-8" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-400 text-center md:text-left">
                        © {currentYear} erickg.dev. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <button className="hover:text-blue-400 transition-colors duration-300">
                            Privacy Policy
                        </button>
                        <button className="hover:text-blue-400 transition-colors duration-300">
                            Terms of Service
                        </button>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
