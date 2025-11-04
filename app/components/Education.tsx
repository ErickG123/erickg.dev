import { Card } from '@radix-ui/themes';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

const education = [
    {
        degree: "Bachelor's degree in Computer Engineering",
        institution: 'GranTiete',
        year: '2021 - 2025'
    },
    {
        degree: 'Systems Development Technician',
        institution: 'ETEC Comendador João Rays',
        year: '2019 - 2020'
    },
];

const courses = [
    'Advanced Algorithms & Data Structures',
    'Cloud Computing & Microservices',
    'Full-Stack Web Development',
    'Database Systems & Design',
];

export function Education() {
    return (
        <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>
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
                        Education & Competencies
                    </h2>
                    <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Academic background and professional certifications
                    </p>
                </motion.div>

                <div className="w-2/3 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="p-2 rounded-lg bg-blue-500/10">
                            <GraduationCap className="text-blue-400" size={28} />
                        </div>
                        <h3 className="text-2xl text-white">Education</h3>
                    </motion.div>
                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="group bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 p-6 hover:border-blue-500/50 transition-all duration-500 relative overflow-hidden rounded-md">
                                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10">
                                        <h4 className="text-xl text-white mb-2">{edu.degree}</h4>
                                        <p className="text-blue-400 mb-1">{edu.institution}</p>
                                        <p className="text-gray-500">{edu.year}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
