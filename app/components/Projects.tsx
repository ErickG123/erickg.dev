import { Badge, Card } from '@radix-ui/themes';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

const projects = [
    {
        name: 'ForesenciLab',
        description: 'ForenseLab is a modular digital forensic analysis toolkit developed as a Computer Engineering capstone project. Its main goal is to serve as an educational bridge for students, educators, and cybersecurity enthusiasts.',
        technologies: ['Python', 'Typer', 'PyPi', 'CI/CD'],
        link: 'https://github.com/ErickG123/devkit_forense'
    },
    {
        name: 'ForesenciLab SPA',
        description: 'A SPA that offers clear and interactive documentation for the ForensicLab project, a modular toolkit for digital forensic analysis.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
        link: 'https://github.com/ErickG123/forensiclab-spa'
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
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
                        My Projects
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A selection of recent projects showcasing my technical expertise
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="group h-full bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 p-6 hover:border-blue-500/50 transition-all duration-500 flex flex-col relative overflow-hidden rounded-md">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{
                                        background: [
                                            'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                                            'radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                                            'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
                                        ],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                ></motion.div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-500"
                                        >
                                            <FolderGit2 className="text-blue-400" size={24} />
                                        </motion.div>
                                        <a href={project.link} target='_blank' className="flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className="text-gray-500 hover:text-blue-400 transition-colors hover:cursor-pointer"
                                                aria-label="View on GitHub"
                                            >
                                                <Github size={20} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1, rotate: -5 }}
                                                className="text-gray-500 hover:text-blue-400 transition-colors hover:cursor-pointer"
                                                aria-label="View project"
                                            >
                                                <ExternalLink size={20} />
                                            </motion.button>
                                        </a>
                                    </div>

                                    <h3 className="text-xl text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                        {project.name}
                                    </h3>

                                    <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="pt-4 border-t border-gray-800/50">
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + i * 0.05 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Badge
                                                        className="border-gray-700/50 bg-gray-800/30 text-gray-300 hover:border-blue-400/50 hover:text-blue-400 hover:bg-blue-500/10 
                                                                     transition-all duration-300 text-xs backdrop-blur-sm rounded-md border px-3 py-1"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
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
