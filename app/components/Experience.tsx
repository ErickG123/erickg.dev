import { Card } from '@radix-ui/themes';
import { motion } from 'motion/react';

const experiences = [
    {
        title: 'Full-Stack Developer',
        company: 'Freelance',
        period: 'Jul 2025 - Present',
        responsibilities: [
            'Frontend development of web applications, focusing on performance, componentization, and architectural best practices.',
            'Active participation in the entire development cycle, from implementing responsive interfaces to integrating APIs and optimizing user experience.',
        ],
        technologies: ['React', 'Node.js', 'Angular', 'Python', 'PHP', 'MySQL', 'PostgreSQL', 'AWS', 'Docker'],
    },
    {
        title: 'Full-Stack Developer',
        company: 'Compu Informática',
        period: 'dec 2023 - Present',
        responsibilities: [
            'Building responsive and high-performance web systems with great user experience',
            'Involved in both frontend design and backend logic, delivering efficient and scalable solutions',
            'Also work as a Computer Maintenance Technician, performing diagnostics, repairs, and preventive maintenance on IT equipment',
            'Ensure system reliability and user productivity through hands-on technical support',
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'PHP'],
    },
    {
        title: 'Junior Developer',
        company: 'SIALOG Software Solutions',
        period: 'Apr 2021 - May 2023',
        responsibilities: [
            'Developed and maintained web applications using Ruby on Rails with PostgreSQL as the main database',
            'Built modern, responsive, and intuitive interfaces using HTML, TailwindCSS, and JavaScript',
            'Actively participated in all stages of the development cycle, from modeling to deployment',
            'Contributed to automated testing, improving system stability and reliability',
            'Gained strong experience with agile methodologies, clean code practices, and efficient problem-solving',
        ],
        technologies: ['Ruby on Rails', 'JavaScript', 'Tailwind CSS', 'Docker', 'PostgreSQL'],
    },
];

export function Experience() {
    return (
        <section id="experience" className="py-20 md:py-32 bg-gray-950 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
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
                        Work Experience
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Building innovative solutions across different industries
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-blue-500/50"></div>

                        <div className="space-y-12">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className="hidden md:block absolute left-6 top-8 w-5 h-5 rounded-full bg-blue-500 border-4 border-gray-950 z-10 shadow-lg shadow-blue-500/50"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                                    </motion.div>

                                    <Card className="group bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 p-6 md:ml-20 hover:border-blue-500/50 transition-all duration-500 relative overflow-hidden rounded-md">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">{exp.title}</h3>
                                                    <p className="text-blue-400">{exp.company}</p>
                                                </div>
                                                <span className="text-gray-500 mt-2 sm:mt-0 px-3 py-1 bg-gray-800/50 rounded-full text-sm backdrop-blur-sm border border-gray-700/50">
                                                    {exp.period}
                                                </span>
                                            </div>

                                            <ul className="space-y-2 mb-4">
                                                {exp.responsibilities.map((resp, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                                        className="text-gray-400 flex items-start gap-2"
                                                    >
                                                        <span className="text-blue-400 mt-1.5 flex-shrink-0">▸</span>
                                                        <span>{resp}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/50">
                                                {exp.technologies.map((tech, i) => (
                                                    <motion.span
                                                        key={i}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
