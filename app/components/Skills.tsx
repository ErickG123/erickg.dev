import { Badge, Card } from '@radix-ui/themes';
import { Code2, Server, Database, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

const skillCategories = [
    {
        title: 'Frontend',
        icon: Code2,
        skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3'],
        color: 'text-blue-400',
        gradient: 'from-blue-500/10 to-blue-600/5',
    },
    {
        title: 'Backend',
        icon: Server,
        skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL', 'Java', 'Spring Boot'],
        color: 'text-cyan-400',
        gradient: 'from-cyan-500/10 to-cyan-600/5',
    },
    {
        title: 'Databases',
        icon: Database,
        skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Supabase', 'Firebase'],
        color: 'text-violet-400',
        gradient: 'from-violet-500/10 to-violet-600/5',
    },
    {
        title: 'Tools & DevOps',
        icon: Wrench,
        skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Kubernetes', 'Webpack', 'Jest'],
        color: 'text-indigo-400',
        gradient: 'from-indigo-500/10 to-indigo-600/5',
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-20 md:py-32 bg-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                        Technical Skills
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A comprehensive toolkit for building modern web applications
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="group relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 p-6 hover:border-blue-500/50 transition-all duration-500 overflow-hidden rounded-md">
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient} backdrop-blur-sm`}
                                        >
                                            <category.icon className={category.color} size={28} />
                                        </motion.div>
                                        <h3 className="text-xl text-white">{category.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <Badge
                                                    className="border-gray-700/50 bg-gray-800/30 text-gray-300 hover:border-blue-400/50 hover:text-blue-400 hover:bg-blue-500/10 
                                                                transition-all duration-300 px-3 py-1 backdrop-blur-sm rounded-md border"
                                                >
                                                    {skill}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
