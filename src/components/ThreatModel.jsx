import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import GradualSpacing from './ui/GradualSpacing'
import './ThreatModel.css'

const threatData = {
    ddos: {
        title: "DDoS / Bot Traffic",
        target: "Load Balancer & WAF",
        attack: "Volumetric attacks aiming to exhaust server resources.",
        mitigation: "Configured Cloudflare WAF rules, rate limiting, and automated IP banning via n8n webhooks.",
        color: "#ff3b3b"
    },
    auth: {
        title: "Credential Stuffing",
        target: "Authentication API",
        attack: "Automated login attempts using compromised password lists.",
        mitigation: "Implemented strict JWT expiration, Redis-backed rate limiting in Flask/Django, and automated Slack alerts for spike detection.",
        color: "#ff9f0a"
    },
    sqli: {
        title: "SQL Injection (SQLi)",
        target: "Database Layer",
        attack: "Malicious payloads injected into input fields to manipulate backend queries.",
        mitigation: "Enforced strict ORM parameterization (Django), sanitized inputs, and isolated database VPC with least-privilege IAM roles.",
        color: "#ff375f"
    }
};

const anim = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: d }
    }),
}

export default function ThreatModel() {
    const [activeThreat, setActiveThreat] = useState(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    const toggleThreat = (key) => {
        setActiveThreat(prev => prev === key ? null : key)
    }

    return (
        <section className="threat-model section-pad" id="threat-model" ref={ref}>
            <div className="container">
                <div className="divider" />
                <div className="threat-model__inner">

                    <motion.p
                        className="section-label"
                        variants={anim}
                        custom={0}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        Attack Surface Model
                    </motion.p>

                    <motion.h2
                        className="threat-model__heading"
                        variants={anim}
                        custom={0.1}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <GradualSpacing text="Architecture Threats" />
                    </motion.h2>

                    <motion.p
                        className="threat-model__instruction"
                        variants={anim}
                        custom={0.15}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        Click the pulsing red markers on the architecture level to reveal attack vectors and my mitigation strategies.
                    </motion.p>

                    <motion.div
                        className="threat-model__content glass"
                        variants={anim}
                        custom={0.25}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        <div className="threat-model__diagram">
                            <div className="diagram-node">
                                <div className="node-box">Client</div>
                            </div>

                            <div className="diagram-line"></div>

                            <div className="diagram-node">
                                <div className="node-box">Edge / WAF</div>
                                <button
                                    className={`threat-marker ${activeThreat === 'ddos' ? 'active' : ''}`}
                                    onClick={() => toggleThreat('ddos')}
                                    aria-label="Toggle DDoS threat details"
                                />
                            </div>

                            <div className="diagram-line"></div>

                            <div className="diagram-node">
                                <div className="node-box">Backend API (Django)</div>
                                <button
                                    className={`threat-marker ${activeThreat === 'auth' ? 'active' : ''}`}
                                    onClick={() => toggleThreat('auth')}
                                    aria-label="Toggle Credential Stuffing threat details"
                                />
                            </div>

                            <div className="diagram-line"></div>

                            <div className="diagram-node">
                                <div className="node-box">Database</div>
                                <button
                                    className={`threat-marker ${activeThreat === 'sqli' ? 'active' : ''}`}
                                    onClick={() => toggleThreat('sqli')}
                                    aria-label="Toggle SQL Injection threat details"
                                />
                            </div>
                        </div>

                        <div className="threat-model__panel">
                            <AnimatePresence mode="wait">
                                {!activeThreat ? (
                                    <motion.p
                                        key="hint"
                                        className="panel-hint"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Select a pulsing threat marker to view attack details.
                                    </motion.p>
                                ) : (
                                    <motion.div
                                        key={activeThreat}
                                        className="mitigation-card"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 style={{ color: threatData[activeThreat].color }}>
                                            {threatData[activeThreat].title}
                                        </h3>

                                        <div className="mitigation-detail">
                                            <span className="detail-label">Target:</span>
                                            <span className="detail-value">{threatData[activeThreat].target}</span>
                                        </div>

                                        <div className="mitigation-detail">
                                            <span className="detail-label">Attack:</span>
                                            <span className="detail-value">{threatData[activeThreat].attack}</span>
                                        </div>

                                        <div className="mitigation-detail highlight">
                                            <span className="detail-label">What I Do:</span>
                                            <span className="detail-value">{threatData[activeThreat].mitigation}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
