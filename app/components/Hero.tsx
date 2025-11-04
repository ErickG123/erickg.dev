import { Button } from '@radix-ui/themes';
import { Code2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
    backgroundImage: string;
}

export function Hero({ backgroundImage }: HeroProps) {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Workspace background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-gray-950/98 via-blue-950/95 to-gray-900/97"></div>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                ></motion.div>
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
                ></motion.div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            <Code2 className="text-blue-400" size={32} />
                        </motion.div>
                        <span className="text-blue-400">Hello, I'm Erick</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6"
                    >
                        <span className="inline-block bg-linear-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                            Full-Stack Developer
                        </span>
                    </motion.h1>

                    <div id="about" className="scroll-mt-20">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
                        >
                            I'm driven by curiosity to understand how things work and how I can make them better through technology. 
                            Throughout my journey in Computer Engineering, I've deepened my knowledge in various areas such as web 
                            and mobile development, Arduino automation, computer maintenance, and language learning, always seeking 
                            to integrate different skills in a practical and creative way.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button
                            onClick={() => scrollToSection('experience')}
                            className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 
                                       shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 group relative overflow-hidden
                                       hover:cursor-pointer rounded-md"
                        >
                            <span className="relative z-10 flex items-center">
                                View My Work
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>
                        <Button
                            onClick={() => scrollToSection('contact')}
                            variant="outline"
                            className="border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-4 py-3 
                            backdrop-blur-sm bg-blue-500/5 transition-all duration-300 hover:cursor-pointer rounded-md"
                        >
                            Contact Me
                        </Button>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1.5 h-3 bg-blue-400 rounded-full"
                        ></motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
