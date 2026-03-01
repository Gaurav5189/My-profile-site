import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextScramble from './ui/TextScramble'
import { HiArrowUpRight } from 'react-icons/hi2'
import './Projects.css'

const PROJECTS = [
    {
        id: 'p1',
        number: '01',
        category: 'Secure Backend Development',
        title: 'Ravenshaw Alumni System',
        year: '2024',
        desc: 'Architected and deployed a dedicated alumni networking platform. Hardened the application by implementing core Django security protocols and routing traffic through Cloudflare for enhanced DDoS protection and DNS management.',
        tags: ['Django', 'Python', 'Cloudflare', 'Web Security'],
        placeholder: 'Live Web Application',
        link: 'https://ravenshawalumnisystem.dpdns.org',
        image: '/ravenshaw-site.webp'
    },
    {
        id: 'p2',
        number: '02',
        category: 'System Architecture',
        title: 'PyCloud Media Server',
        year: '2025',
        desc: 'Built a lightweight, self-hosted personal cloud and media center in pure Python. Engineered asynchronous background task queues, real-time system monitoring, and secure local file streaming without relying on external frameworks.',
        tags: ['Python 3', 'Linux', 'Asynchronous I/O', 'Self-Hosted'],
        placeholder: 'Open Source Tool',
        link: 'https://github.com/Gaurav5189/PyCloud-Server',
        image: '/pycloud-img.webp'
    },
    {
        id: 'p3',
        number: '03',
        category: 'Workflow Automation',
        title: 'n8n Security & CI/CD Pipelines',
        year: '2025',
        desc: 'Designed automated CI/CD and security workflows bridging development and operations. Triggered automatic tasks and deployment alerts to ensure continuous, secure delivery and maintenance of live production applications.',
        tags: ['n8n', 'CI/CD', 'Workflow Automation', 'Webhooks'],
        placeholder: 'Infrastructure Maintenance',
        image: '/n8n-img.webp'
    }
]

const anim = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut', delay: d } }),
}

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="projects section-pad" id="projects" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="projects__header">
                    <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        Featured Work
                    </motion.p>
                    <motion.h2 className="projects__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        <TextScramble trigger={isInView}>Selected Projects</TextScramble>
                    </motion.h2>
                </div>

                {/* Project Cards */}
                <div className="projects__list">
                    {PROJECTS.map(({ id, number, category, title, year, desc, tags, placeholder, link, image }, i) => (
                        <motion.div
                            key={id}
                            className="project-card"
                            variants={anim}
                            custom={0.15 + i * 0.12}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            id={`project-card-${i + 1}`}
                        >
                            <div className="project-card__image">
                                {image ? (
                                    <div className="project-card__image-cover">
                                        <img src={image} alt={title} className="project-card__img" loading="lazy" />
                                    </div>
                                ) : (
                                    <div className="project-card__image-placeholder">
                                        <span>{placeholder}</span>
                                        <p>#</p>
                                    </div>
                                )}
                                <div className="project-card__overlay">
                                    {link && (
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="project-card__view-btn" id={`project-view-btn-${i + 1}`}>
                                            View Project <HiArrowUpRight />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="project-card__info">
                                <div className="project-card__meta">
                                    <span className="project-card__number">{number}</span>
                                    <span className="project-card__category">{category}</span>
                                    <span className="project-card__year">{year}</span>
                                </div>
                                <h3 className="project-card__title">{title}</h3>
                                <p className="project-card__desc">{desc}</p>
                                <div className="project-card__tags">
                                    {tags.map(tag => <span key={tag} className="project-card__tag">{tag}</span>)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* All projects link (TODO: add later)
                <motion.div
                    className="projects__footer"
                    variants={anim}
                    custom={0.45}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <a href="#" className="projects__all-link" id="view-all-projects-btn">
                        View all projects <HiArrowUpRight />
                    </a>
                </motion.div>
                */}
            </div>
        </section>
    )
}
