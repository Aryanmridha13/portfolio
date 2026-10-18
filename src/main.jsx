import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { cancelFrame, frame, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Database, Mail, Menu, PanelsTopLeft, Workflow, X } from 'lucide-react'
import 'lenis/dist/lenis.css'
import './styles.css'

function Github({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.31-3.76-1.31-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.99 1.69 2.59 1.2 3.22.91.1-.71.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg> }
function Linkedin({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10.2H5.68v8.5h2.66v-8.5ZM7.01 5.98a1.54 1.54 0 1 0 0 3.08 1.54 1.54 0 0 0 0-3.08Zm11.31 7.85c0-2.56-1.37-3.75-3.2-3.75a2.77 2.77 0 0 0-2.49 1.37V10.2H9.97v8.5h2.66v-4.2c0-1.1.21-2.16 1.57-2.16 1.34 0 1.36 1.25 1.36 2.23v4.13h2.66v-4.87Z"/></svg> }

const links = [
  ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Journey', '#journey'], ['Contact', '#contact'],
]

const projects = [
  {
    number: '01', name: 'Electric Vehicle Showroom', type: 'FRONTEND · BUSINESS',
    summary: 'A responsive showroom experience that brings electric vehicles, services, and company information together in a clear, mobile-first interface.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Vercel'], repo: 'https://github.com/Aryanmridha13/Showroom_project', live: 'https://mridha-and-sons-showroom.vercel.app/', image: '/project-previews/showroom.png', imageAlt: 'Live electric vehicle showroom homepage with a blue electric scooter',
  },
  {
    number: '02', name: 'Movie Ticket Booking Website', type: 'FRONTEND · ACADEMIC',
    summary: 'A movie discovery and ticket booking experience with showtime browsing, seat selection, and a guided booking flow.',
    stack: ['React', 'JavaScript', 'HTML', 'CSS'], repo: null, live: 'https://watchanythig.netlify.app/', image: '/project-previews/movie-booking.png', imageAlt: 'Live movie ticket booking site with movie cards and booking navigation',
  },
  {
    number: '03', name: 'AI Chatbot', type: 'AI · INTERACTIVE UI',
    summary: 'A conversational interface for sending prompts to an AI service, with dynamically rendered responses and thoughtful interaction states.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'AI API'], repo: 'https://github.com/Aryanmridha13/Ai_chatbot', live: 'https://ai-chatbot-livid-xi-87.vercel.app/', image: '/project-previews/ai-chatbot.png', imageAlt: 'Live AI Chatbot Studio sign-in page with its local demo mode panel',
  },
  {
    number: '04', name: 'Home Services Booking System', type: 'FULL STACK · ACADEMIC',
    summary: 'A booking platform for finding skilled home service professionals, managing time slots, and coordinating customer and worker workflows.',
    stack: ['Django', 'React', 'REST API', 'SQLite'], repo: null, visual: 'booking',
  },
]

const skillGroups = [
  { title: 'Languages', description: 'Programming fundamentals and problem solving.', icon: Braces, items: ['C++', 'Python', 'JavaScript'] },
  { title: 'Frontend', description: 'Responsive interfaces and reusable components.', icon: PanelsTopLeft, items: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS'] },
  { title: 'Backend & data', description: 'Application logic, APIs, and relational databases.', icon: Database, items: ['Django', 'REST APIs', 'Oracle SQL', 'SQLite'] },
  { title: 'Tools & AI', description: 'Version control, design tools, and AI-assisted workflows.', icon: Workflow, items: ['Git', 'GitHub', 'Figma', 'Canva', 'ChatGPT', 'Claude', 'AI API integration'] },
]

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  if (reduce) return null
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
}

function Reveal({ children, className = '', delay = 0, stagger = false }) {
  const reduce = useReducedMotion()
  return <motion.div
    className={className}
    initial={reduce ? false : { opacity: 0, y: 24 }}
    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.65, delay, ease: [.2, .7, .2, 1], ...(stagger ? { staggerChildren: 0.12 } : {}) }}
  >{children}</motion.div>
}

function PathField() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, .42], [0, 110])
  const rotate = useTransform(scrollYProgress, [0, .42], [0, 2.5])
  return <motion.svg style={{ y, rotate }} className="path-field" viewBox="0 0 1600 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M-80 80 C210 175 420 220 680 255 S1210 350 1660 750"/><path d="M-80 118 C190 211 450 251 720 292 S1260 405 1660 790"/>
      <path d="M-70 205 C220 298 470 336 760 370 S1260 470 1630 820"/><path d="M-90 238 C230 340 470 376 750 410 S1210 520 1580 840"/>
      <path d="M-60 295 C210 390 500 435 790 470 S1190 570 1460 850"/><path d="M-60 326 C210 420 480 470 740 505 S1120 610 1400 860"/>
      <path d="M100 780 C220 540 290 370 450 290 S850 330 1120 460 S1450 660 1690 900"/>
      <path d="M160 800 C275 558 340 400 480 325 S850 360 1110 505 S1420 700 1630 900"/>
      <path d="M210 800 C315 585 375 440 500 372 S845 395 1080 535 S1370 730 1570 900"/>
      <path d="M265 820 C360 610 415 470 520 420 S820 425 1045 565 S1320 755 1510 900"/>
      <path d="M-80 430 C230 485 420 520 610 560 S990 650 1250 870"/><path d="M-80 475 C180 520 380 565 560 604 S900 690 1130 880"/>
    </g>
    <g className="flow-arrows" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g className="flow-arrow"><path d="M-7 -4 L0 0 L-7 4 M-4 0 H0"/><animateMotion dur="11s" begin="-3s" repeatCount="indefinite" rotate="auto" path="M-80 80 C210 175 420 220 680 255 S1210 350 1660 750"/></g>
      <g className="flow-arrow"><path d="M-7 -4 L0 0 L-7 4 M-4 0 H0"/><animateMotion dur="14s" begin="-8s" repeatCount="indefinite" rotate="auto" path="M1660 750 C1210 350 680 255 420 220 S210 175 -80 80"/></g>
      <g className="flow-arrow"><path d="M-7 -4 L0 0 L-7 4 M-4 0 H0"/><animateMotion dur="13s" begin="-6s" repeatCount="indefinite" rotate="auto" path="M-60 326 C210 420 480 470 740 505 S1120 610 1400 860"/></g>
      <g className="flow-arrow"><path d="M-7 -4 L0 0 L-7 4 M-4 0 H0"/><animateMotion dur="16s" begin="-11s" repeatCount="indefinite" rotate="auto" path="M1510 900 C1320 755 1045 565 820 425 S520 420 415 470 C360 520 315 650 265 820"/></g>
    </g>
  </motion.svg>
}

function Navbar() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const [visible, setVisible] = useState(true)
  const openRef = useRef(false)
  const lastScroll = useRef(0)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', current => {
    const previous = lastScroll.current
    const delta = current - previous
    if (current < 80 || openRef.current) setVisible(true)
    else if (Math.abs(delta) > 5) setVisible(delta < 0)
    lastScroll.current = current
  })
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(`#${entry.target.id}`)
    }), { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return <motion.header className="nav-wrap" animate={{ y: visible ? 0 : -110 }} transition={{ duration: reduce ? 0 : .28, ease: [.22, .7, .2, 1] }}><nav className="nav" aria-label="Main navigation">
    <a className="wordmark" href="#home" aria-label="Aryan Mridha, home"><span className="mark">AM</span><span>Aryan Mridha<span className="wordmark-dot">.</span></span></a>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      {links.map(([label, href]) => <a key={href} className={active === href ? 'active' : ''} href={href} onClick={() => { setOpen(false); openRef.current = false }}>{label}</a>)}
      <a className="nav-resume" href="/Aryan-Mridha-Resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>
    </div>
    <button className="menu-toggle" onClick={() => { const next = !open; setOpen(next); openRef.current = next; if (next) setVisible(true) }} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
  </nav></motion.header>
}

function HeroVisual() {
  const reduce = useReducedMotion()
  const float = (duration, delay = 0) => reduce ? {} : { animate: { y: [0, -10, 0], rotate: [0, 1.5, 0] }, transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' } }
  return <div className="hero-art" aria-label="Abstract developer illustration with floating technology labels">
    <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-orbit orbit-three"/>
    <motion.div className="art-cube" {...float(8, .1)}><div className="cube-rotator"><div className="cube-face cube-front"><span>AM</span><small>SOFTWARE<br/>DEVELOPER</small></div><div className="cube-face cube-side"/><div className="cube-face cube-top"/></div></motion.div>
    <motion.div className="code-panel" {...float(7, .4)}><div className="code-panel-top"><span><i/><i/><i/></span><small>ARYAN / BUILDING</small><b>↗</b></div><div className="code-lines"><span><i>01</i><b>const</b> developer = {'{'}</span><span><i>02</i>&nbsp; name: <em>'Aryan Mridha'</em>,</span><span><i>03</i>&nbsp; focus: <em>'Full-stack'</em>,</span><span><i>04</i>&nbsp; tools: [<em>'React'</em>, <em>'Django'</em>]</span><span><i>05</i>{'}'}</span></div><div className="code-panel-foot"><span/><small>IDEAS → INTERFACES → IMPACT</small></div></motion.div>
    <motion.div className="skill-float skill-react" {...float(5.7, .2)}><span className="skill-glyph react-glyph">✳</span> React.js</motion.div>
    <motion.div className="skill-float skill-python" {...float(6.2, .9)}><span className="skill-glyph python-glyph">Py</span> Python</motion.div>
    <motion.div className="skill-float skill-api" {...float(7.1, .5)}><span className="skill-glyph api-glyph">⌘</span> Django · REST</motion.div>
    <div className="art-spark spark-one"/><div className="art-spark spark-two"/><div className="art-spark spark-three"/>
  </div>
}

function Hero() {
  const reduce = useReducedMotion()
  const rise = reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: .75, ease: [.2, .7, .2, 1] } }
  return <section className="hero" id="home">
    <PathField />
    <div className="hero-grain" />
    <div className="hero-content">
      <div className="hero-copy-column">
        <motion.div className="eyebrow" {...rise}><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-divider">/</span> BENGALURU, INDIA</motion.div>
        <motion.h1 {...rise} transition={{ ...rise.transition, delay: .1 }}>Aryan<br /><span>Mridha<span className="name-period">.</span></span></motion.h1>
        <motion.p className="hero-role" {...rise} transition={{ ...rise.transition, delay: .16 }}>SOFTWARE DEVELOPER <span>·</span> FULL-STACK WEB</motion.p>
        <motion.p className="hero-copy" {...rise} transition={{ ...rise.transition, delay: .2 }}>I build thoughtful digital experiences with React, Python, and Django—combining clear interfaces with reliable application features.</motion.p>
        <motion.div className="hero-actions" {...rise} transition={{ ...rise.transition, delay: .3 }}>
          <a className="button button-light" href="#projects">Explore my work <ArrowRight size={16} /></a>
          <a className="button button-quiet" href="mailto:aryanmridha8@gmail.com">Contact me <ArrowUpRight size={15} /></a>
        </motion.div>
        <motion.div className="hero-socials" {...rise} transition={{ ...rise.transition, delay: .4 }}>
          <a href="https://github.com/Aryanmridha13" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={12} /></a>
          <a href="https://www.linkedin.com/in/aryan-mridha-0516a5354/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} /></a>
          <a className="hero-resume-link" href="/Aryan-Mridha-Resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={14}/></a>
          <a className="hero-resume-link" href="https://drive.google.com/file/d/1X8vOo-HLue55EQhV_TgMw_PlVNtsYfzm/view" target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={14}/></a>
          <span className="hero-location">BENGALURU, INDIA</span>
        </motion.div>
      </div>
      <HeroVisual />
    </div>
    <a href="#about" className="scroll-hint"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
    <div className="hero-index">01 <span /> 05</div>
  </section>
}

function SectionLabel({ number, children, light = false }) { return <div className={`section-label ${light ? 'light' : ''}`}><span>{number} /</span>{children}</div> }

function About() {
  return <section className="about section-pad" id="about">
    <div className="section-head"><SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel><span className="mono section-note">THE PERSON BEHIND THE CODE</span></div>
    <Reveal className="about-grid">
      <h2>Curious by nature.<br /><span>Developer by choice.</span></h2>
      <div className="about-body"><p>I’m a Computer Science and Engineering graduate from Technocrats Institute of Technology & Science, Bhopal. I enjoy turning ideas into approachable, reliable web applications.</p><p>My recent work spans responsive React interfaces, Django backends, REST APIs, and database-backed features. I care about clear structure, useful details, and code that stays easy to work with.</p><a className="text-link" href="#journey">More about my journey <ArrowDownRight size={16} /></a></div>
    </Reveal>
    <Reveal className="about-stats"><div><span className="stat-number">04</span><span className="stat-label">SELECTED PROJECTS</span></div><div><span className="stat-number">2022<span>—</span>26</span><span className="stat-label">B.TECH · COMPUTER SCIENCE</span></div><div><span className="stat-number">∞</span><span className="stat-label">THINGS LEFT TO LEARN</span></div></Reveal>
  </section>
}

function Skills() {
  const reduce = useReducedMotion()
  return <section className="skills section-pad" id="skills"><div className="section-head"><SectionLabel number="02" light>THE TOOLKIT</SectionLabel><span className="mono section-note">TOOLS I LIKE TO BUILD WITH</span></div>
    <Reveal className="skills-intro"><h2>A practical toolkit,<br /><span>always in progress.</span></h2><p>Comfortable across the stack, with a focus on building clear interfaces and dependable application features.</p></Reveal>
    <Reveal className="skill-grid" stagger>{skillGroups.map((group, i) => { const Icon = group.icon; return <motion.article className={`skill-group skill-card-${i + 1}`} key={group.title} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} whileHover={reduce ? undefined : { y: -4, scale: 1.01 }} viewport={{ once: true }} transition={{ duration: .45, delay: i * .1 }}><div className="skill-card-top"><span className="skill-index">0{i + 1} / 04</span><span className="skill-icon"><Icon size={18}/></span></div><h3>{group.title}</h3><p>{group.description}</p><div className="skill-chips">{group.items.map(item => <span key={item}>{item}</span>)}</div></motion.article> })}</Reveal>
  </section>
}

function Projects() {
  const [filter, setFilter] = useState('All work')
  const reduce = useReducedMotion()
  const filters = ['All work', 'Frontend', 'Full stack', 'AI & API']
  const visible = projects.filter(p => filter === 'All work' || (filter === 'Frontend' && p.type.includes('FRONTEND')) || (filter === 'Full stack' && p.type.includes('FULL STACK')) || (filter === 'AI & API' && p.type.includes('AI')))
  return <section className="projects section-pad" id="projects"><div className="section-head"><SectionLabel number="03" light>SELECTED WORK</SectionLabel><span className="mono section-note">A FEW THINGS I’VE MADE</span></div>
    <Reveal className="projects-heading"><div><h2>Work with a point<br /><span>of view.</span></h2><p>Practical projects, shaped around real user needs.</p></div><a className="all-work-link" href="https://github.com/Aryanmridha13" target="_blank" rel="noreferrer">ALL REPOSITORIES <ArrowUpRight size={15}/></a></Reveal>
    <div className="filter-bar"><span className="mono filter-count">04 PROJECTS</span><div className="filter-options" aria-label="Filter projects">{filters.map(f => <button key={f} className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div></div>
    <div className="project-grid">{visible.map((project, i) => <motion.article key={project.number} layout className="project-card" style={{ transformPerspective: 1000 }} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} whileHover={reduce ? undefined : { y: -5, rotateX: 1.2, rotateY: i % 2 ? -1 : 1 }} transition={{ duration: .45, ease: [.2, .7, .2, 1] }}><div className={`project-art${project.visual ? ' project-art--booking' : ''}`}>{project.image ? <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async"/> : <div className="booking-preview" aria-label="Home services booking interface preview"><div className="booking-topline"><span>HOME / SERVICES</span><span>● AVAILABLE NOW</span></div><div className="booking-title">Find the right help<br/><em>for your home.</em></div><div className="booking-search"><span>⌕ &nbsp; What do you need done?</span><b>Find a pro&nbsp; ↗</b></div><div className="booking-pros"><div><i>✦</i><b>Electrical</b><small>Verified professionals</small></div><div><i>⌂</i><b>Home cleaning</b><small>Book a time that works</small></div><div><i>◷</i><b>Repairs</b><small>Reliable local experts</small></div></div></div>}</div><div className="project-info"><div className="project-meta"><span>{project.number} <i>/</i> {project.type}</span><div className="project-links">{project.live && <a className="project-demo-link" href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live demo`}>Live demo <ArrowUpRight size={12}/></a>}{project.repo && <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source code`}><Github size={16}/><ArrowUpRight size={12}/></a>}</div></div><h3>{project.name}</h3><p>{project.summary}</p><div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div></motion.article>)}</div>
    <p className="project-footnote">Projects without a linked repository are described from my résumé. <a href="https://github.com/Aryanmridha13" target="_blank" rel="noreferrer">Browse my GitHub profile <ArrowUpRight size={12}/></a></p>
  </section>
}

function Journey() {
  const reduce = useReducedMotion()
  const items = [
    { date: 'APR 2024 — JUN 2025', title: 'Full Stack Web Developer', place: 'Academic & Personal Projects', text: 'Built full-stack applications with React.js and Django, creating responsive interfaces and implementing backend features including authentication, routing, and form validation.' },
    { date: '2022 — 2026', title: 'B.Tech, Computer Science & Engineering', place: 'Technocrats Institute of Technology & Science · Bhopal', text: 'Developed a foundation in programming, software development, databases, and problem solving.' },
    { date: 'CERTIFICATION', title: 'Python Full Stack Web Development', place: 'Cybrom Technology Pvt. Ltd.', text: 'Full stack web development certification.' },
  ]
  return <section className="journey section-pad" id="journey"><div className="section-head"><SectionLabel number="04">THE JOURNEY</SectionLabel><span className="mono section-note">LEARNING BY BUILDING</span></div><Reveal className="journey-layout"><div className="journey-intro"><h2>Good work comes<br /><span>from steady progress.</span></h2><div className="journey-note"><span>BUILT THROUGH PRACTICE</span><p>Computer science gave me the foundations; academic and personal projects taught me to turn them into working products. I focus on responsive React interfaces, Django features, and reliable REST APIs—and keep learning with every build.</p><div className="journey-note-tags"><b>React.js</b><b>Django</b><b>REST APIs</b></div></div></div><div className="timeline">{items.map((item, i) => <motion.article className="timeline-item" key={item.title} initial={reduce ? false : { opacity: 0, x: 18 }} whileInView={reduce ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: i * .12 }}><div className="timeline-date">{item.date}</div><div className="timeline-marker">0{i + 1}</div><div className="timeline-copy"><h3>{item.title}</h3><h4>{item.place}</h4><p>{item.text}</p></div></motion.article>)}</div></Reveal></section>
}

function Contact() {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = `Portfolio message from ${formData.get('name')}`
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
    window.location.href = `mailto:aryanmridha8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return <section className="contact section-pad" id="contact"><div className="contact-glow"/><div className="section-head"><SectionLabel number="05" light>LET’S CONNECT</SectionLabel><span className="mono section-note">GOOD CONVERSATIONS START HERE</span></div><Reveal className="contact-main"><div className="contact-intro"><h2>Have something<br /><span>in mind?</span></h2><p>I’m open to entry-level software, frontend, and full-stack opportunities. If you’re building something thoughtful, I’d like to hear about it.</p><a className="contact-direct" href="mailto:aryanmridha8@gmail.com">aryanmridha8@gmail.com <ArrowUpRight size={15}/></a></div><form className="contact-form" onSubmit={handleSubmit}><h3>Send a message</h3><label className="sr-only" htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your Name" required/><label className="sr-only" htmlFor="contact-email-input">Your email</label><input id="contact-email-input" name="email" type="email" autoComplete="email" placeholder="Your Email" required/><label className="sr-only" htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="Write your message..." rows="5" required/><button type="submit">Send Message <ArrowRight size={17}/></button></form></Reveal><div className="contact-links"><a href="mailto:aryanmridha8@gmail.com"><Mail size={16}/> Email <ArrowUpRight size={12}/></a><a href="https://www.linkedin.com/in/aryan-mridha-0516a5354/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={12}/></a><a href="https://github.com/Aryanmridha13" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={12}/></a></div></section>
}

function Footer() { return <footer className="footer"><a className="wordmark" href="#home"><span className="mark">AM</span><span>Aryan Mridha<span className="wordmark-dot">.</span></span></a><span className="mono footer-note">DESIGNED & BUILT WITH CARE</span><span className="mono copyright">© {new Date().getFullYear()} ARYAN MRIDHA</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={13}/></a></footer> }

function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const update = ({ timestamp }) => lenisRef.current?.lenis?.raf(timestamp)
    frame.setup(update, true)
    return () => cancelFrame(update)
  }, [])

  return <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: .11, smoothWheel: true, anchors: true }}>{children}</ReactLenis>
}

function App() { return <SmoothScroll><><ScrollProgress/><Navbar/><main><Hero/><About/><Skills/><Projects/><Journey/><Contact/></main><Footer/></></SmoothScroll> }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
