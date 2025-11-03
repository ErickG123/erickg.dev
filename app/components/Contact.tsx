import { useState } from 'react';
import { Mail, Send, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button, Card, TextArea } from '@radix-ui/themes';
import { Input } from '../ui/input';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-20 md:py-32 bg-gray-950 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                ></motion.div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                        Get In Touch
                    </h2>
                    <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {[
                            { icon: Mail, label: 'Email', value: 'erickgabrielalves0@gmail.com' },
                            { icon: Phone, label: 'Phone', value: '+55 (14) 99777-8864' },
                            { icon: MapPin, label: 'Location', value: 'Barra Bonita, SP' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-4 p-4 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-blue-500/50 transition-all duration-300"
                            >
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <item.icon className="text-blue-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">{item.label}</p>
                                    <p className="text-white">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 p-8 hover:border-blue-500/30 transition-all duration-500 rounded-md">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-300 mb-2">
                                            Name *
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-gray-300 mb-2">
                                            Email *
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-gray-300 mb-2">
                                        Subject *
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                                        placeholder="Project inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <TextArea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        cols={72}
                                        className="bg-gray-900/50 border-gray-700/50 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                                    transition-all duration-300 resize-none backdrop-blur-sm p-2.5 outline-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 
                                    shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 group relative overflow-hidden rounded-md
                                    hover:cursor-pointer"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        Send Message
                                        <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
