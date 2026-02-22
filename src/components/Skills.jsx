import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import './Skills.css'

const SERVICES = [
    {
        number: '01',
        title: 'CI/CD Security',
        desc: 'Hardening build and release pipelines with SAST, DAST, dependency scanning, and secret detection — catching vulnerabilities before they reach production.',
        tags: ['GitHub Actions', 'Jenkins', 'SonarQube', 'Snyk'],
    },
    {
        number: '02',
        title: 'Cloud & Infrastructure Security',
        desc: 'Securing cloud-native environments and IaC templates across AWS, GCP, and Azure — enforcing least-privilege, policy-as-code, and compliance guardrails.',
        tags: ['AWS', 'Terraform', 'Checkov', 'IAM'],
    },
    {
        number: '03',
        title: 'Container & Kubernetes Security',
        desc: 'Locking down containerized workloads — image scanning, runtime security, admission controllers, network policies, and RBAC hardening.',
        tags: ['Docker', 'Kubernetes', 'Trivy', 'Falco'],
    },
    {
        number: '04',
        title: 'Threat Modelling & Compliance',
        desc: 'Identifying attack surfaces early in the SDLC, building security frameworks, and achieving compliance with standards like SOC 2, ISO 27001, and CIS Benchmarks.',
        tags: ['STRIDE', 'OWASP', 'SOC 2', 'CIS'],
    },
]

const anim = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: d } }),
}

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="skills section-pad" id="skills" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="skills__header">
                    <motion.p className="section-label" variants={anim} custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        What I Do
                    </motion.p>
                    <motion.h2 className="skills__heading" variants={anim} custom={0.1} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                        Services & Skills
                    </motion.h2>
                </div>

                <div className="skills__grid">
                    {SERVICES.map(({ number, title, desc, tags }, i) => (
                        <motion.div
                            key={number}
                            className="skill-card"
                            variants={anim}
                            custom={0.1 + i * 0.1}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            id={`skill-card-${i + 1}`}
                        >
                            <div className="skill-card__top">
                                <span className="skill-card__number">{number}</span>
                                <HiArrowUpRight className="skill-card__arrow" />
                            </div>
                            <h3 className="skill-card__title">{title}</h3>
                            <p className="skill-card__desc">{desc}</p>
                            <div className="skill-card__tags">
                                {tags.map(tag => (
                                    <span key={tag} className="skill-card__tag">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Scrolling marquee */}
                <div className="skills__marquee" aria-hidden="true">
                    <div className="skills__marquee-track">
                        {['DevSecOps', 'CI/CD Security', 'SAST', 'DAST', 'Kubernetes', 'Docker', 'AWS', 'Terraform', 'Snyk', 'OWASP', 'Zero Trust', 'SRE', 'DevSecOps', 'CI/CD Security', 'SAST', 'DAST', 'Kubernetes', 'Docker', 'AWS', 'Terraform', 'Snyk', 'OWASP', 'Zero Trust', 'SRE'].map((t, i) => (
                            <span key={i}>{t} <em>·</em></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
