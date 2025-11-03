import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

const socialLinks = [
    {
        name: 'GitHub',
        icon: Github,
        url: 'https://github.com/ErickG123',
        color: 'hover:text-white hover:border-white',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        url: 'https://www.linkedin.com/in/erickgdev/',
        color: 'hover:text-blue-400 hover:border-blue-400',
    }
];

export function SocialLinks() {
    return (
        <section className="py-16 bg-gray-900 border-t border-gray-800/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-2xl text-white mb-8">Connect With Me</h3>
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className={`group flex items-center justify-center w-14 h-14 rounded-xl bg-gray-950/50 backdrop-blur-sm border border-gray-800/50 text-gray-400 transition-all duration-300 ${social.color} shadow-lg hover:shadow-xl`}
                                aria-label={social.name}
                            >
                                <social.icon size={24} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
