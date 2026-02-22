import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import './Projects.css'

const PROJECTS = [
    {
        id: 'p1',
        number: '01',
        category: 'CI/CD Security',
        title: 'Secure Pipeline Automation',
        year: '2025',
        desc: 'Designed and implemented a fully automated DevSecOps pipeline integrating SAST, DAST, container scanning, and secret detection — reducing vulnerability exposure by 80%.',
        tags: ['GitHub Actions', 'SonarQube', 'Trivy', 'OWASP ZAP'],
        placeholder: 'Project Preview',
    },
    {
        id: 'p2',
        number: '02',
        category: 'Cloud Security',
        title: 'Zero-Trust Cloud Architecture',
        year: '2024',
        desc: 'Architected a zero-trust AWS environment with IaC security scanning, least-privilege IAM policies, and continuous compliance monitoring aligned to CIS benchmarks.',
        tags: ['AWS', 'Terraform', 'Checkov', 'IAM', 'CloudTrail'],
        placeholder: 'Project Preview',
    },
    {
        id: 'p3',
        number: '03',
        category: 'Container Security',
        title: 'Kubernetes Security Hardening',
        year: '2024',
        desc: 'Hardened a production Kubernetes cluster with OPA Gatekeeper policies, RBAC fine-tuning, network policies, runtime threat detection using Falco, and image signing.',
        tags: ['Kubernetes', 'Falco', 'OPA', 'Docker', 'Cosign'],
        placeholder: 'Project Preview',
    },
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
                        Selected Projects
                    </motion.h2>
                </div>

                {/* Project Cards */}
                <div className="projects__list">
                    {PROJECTS.map(({ id, number, category, title, year, desc, tags, placeholder }, i) => (
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
                                <div className="project-card__image-placeholder">
                                    <span>{placeholder}</span>
                                    <p>Replace with project screenshot</p>
                                </div>
                                <div className="project-card__overlay">
                                    <button className="project-card__view-btn" id={`project-view-btn-${i + 1}`}>
                                        View Project <HiArrowUpRight />
                                    </button>
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
                                    {tags.map(tag => <span key={tag} className="skill-card__tag">{tag}</span>)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* All projects link */}
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
            </div>
        </section>
    )
}
