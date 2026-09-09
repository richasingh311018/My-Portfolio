import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, Award, BrainCircuit, BriefcaseBusiness, ChevronDown, Code2, Download,
  ExternalLink, Github, GraduationCap, Heart, Linkedin, Mail, Menu, MoveUpRight,
  Radio, Sparkles, Terminal, X, Zap
} from 'lucide-react';
import './styles.css';
import profilePhoto from '../profile.jpeg';
import classAwardPhoto from '../12th award.jpeg';
import internshipPhoto from '../internship buiding.jpeg';
import internshipCupPhoto from '../internship cup.jpeg';
import ibmGroupPhoto from '../ibm bob hackathon grp.jpeg';
import avinyaGroupPhoto from '../iit guwahati grp.jpeg';
import hindalcoCertificate from '../internship certificate.jpeg';
import ibmCertificate from '../ibm goodies.jpeg';
import avinyaCertificate from '../iitguwahati goodies.jpeg';

const navItems = [
  ['About', 'about'], ['Education', 'education'], ['Certificates', 'certificates'], ['Stack', 'stack'],
  ['Experience', 'experience'], ['Hackathons', 'hackathons'], ['Work', 'projects'], ['Beyond', 'beyond'], ['Contact', 'contact']
];

const stack = {
  Languages: ['Python', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS'],
  Development: ['React', 'Node.js', 'Express', 'MERN Stack', 'FastAPI', 'Tailwind CSS', 'Bootstrap'],
  Database: ['PostgreSQL', 'Firebase', 'Qdrant'],
  'AI / ML': ['Python', 'AI / ML', 'Computer Vision', 'NLP'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Docker'],
  Cloud: ['AWS', 'Cloud / Deployment']
};

const projects = [
  { number: '01', name: 'RESQNET', type: 'AI disaster intelligence', description: 'An AI-powered disaster intelligence and response system that transforms fragmented reports, images, and location data into actionable rescue intelligence.', tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Qdrant'], image: 'projects/resqnet.jpg', features: ['Disaster Digital Twin', 'Survivor Priority Index', 'Human-in-the-Loop AI'], tone: 'violet' },
  { number: '02', name: 'AI-Based Predictive Energy Monitoring System', type: 'Hindalco internship project', description: 'An AI-based system for monitoring energy consumption, analyzing usage patterns, detecting anomalies, and identifying inefficient energy usage.', tech: ['Python', 'AI / ML'], image: 'projects/energy-monitoring.jpg', features: ['Usage pattern analysis', 'Anomaly detection', 'Inefficient usage detection'], tone: 'pink' },
  { number: '03', name: 'SUNOSAATHI', type: 'Voice-first platform', description: 'A voice-first financial inclusion platform designed to make digital financial services easier to access for users with limited digital literacy.', tech: ['React', 'Tailwind', 'Voice AI', 'OCR'], image: 'projects/sunosaathi.jpg', features: ['Voice-first access', 'Accessible UX', 'Financial inclusion'], tone: 'blue' }
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function TiltCard({ children, className = '' }) {
  const onMove = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 7;
    const y = ((event.clientY - rect.top) / rect.height - .5) * -7;
    event.currentTarget.style.setProperty('--tilt', `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`);
  };
  const reset = event => event.currentTarget.style.setProperty('--tilt', 'perspective(900px) rotateX(0) rotateY(0)');
  return <div className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</div>;
}

function SectionHeading({ eyebrow, title, text }) {
  return <div className="section-heading reveal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function CertificatePreview({ src, alt }) {
  return src.endsWith('.pdf')
    ? <iframe src={src} title={alt} />
    : <img src={src} alt={alt} />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable ? window.scrollY / scrollable * 100 : 0);
      const current = ['home', ...navItems.map(item => item[1])].reverse().find(id => {
        const section = document.getElementById(id);
        return section && window.scrollY >= section.offsetTop - 180;
      });
      if (current) setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = id => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return <>
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    <header className="navbar">
      <a href="#home" className="brand" onClick={() => goTo('home')}><span>R</span><strong>RICHA SINGH</strong></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {navItems.map(([label, id]) => <a className={active === id ? 'active' : ''} href={`#${id}`} key={id} onClick={() => goTo(id)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => goTo('contact')}>Let's talk <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="availability"><i /> Open to opportunities <span>·</span> 2026</div>
          <p className="hero-kicker">Computer Science & Engineering <b>×</b> AI</p>
          <h1>Building ideas<br /><em>into impact.</em></h1>
          <p className="hero-intro">I’m a developer focused on intelligent systems, thoughtful products, and solving problems that matter.</p>
          <div className="hero-actions"><a className="button primary" href="#projects" onClick={() => goTo('projects')}>View my work <ArrowUpRight size={17} /></a><a className="button secondary" href="/resume.pdf" download><Download size={16} /> Download resume</a></div>
          <div className="social-row"><span>Find me on</span><a href="https://www.linkedin.com/in/richa-singh-060853314/" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="https://github.com/richasingh311018" aria-label="GitHub"><Github size={18} /></a><a href="mailto:YOUR_EMAIL" aria-label="Email"><Mail size={18} /></a></div>
        </div>
        <div className="hero-art" aria-label="Abstract interactive developer workspace">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="grid-plane" />
          <div className="code-window">
            <div className="window-bar"><span /><span /><span /><label>intelligence.py</label></div>
            <pre><code><b>class</b> <i>Builder</i>:
  focus = <strong>"real-world AI"</strong>
  curiosity = <strong>∞</strong>

  <b>def</b> <i>create</i>(self, idea):
    <b>return</b> idea.<u>make_useful</u>()</code></pre>
            <div className="window-status"><span><i /> running</span><small>127.0.0.1:3000</small></div>
          </div>
          <div className="floating-chip chip-ai"><BrainCircuit size={15} /> AI / ML</div>
          <div className="floating-chip chip-stack"><Code2 size={15} /> full stack</div>
          <div className="art-caption"><span>01</span><span>curiosity → creation</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ChevronDown size={17} /></a>
      </section>

      <section className="section-shell about-section" id="about">
        <SectionHeading eyebrow="01 / About" title={<>A developer with a<br /><span>builder's mindset.</span></>} text="I build practical software for real problems." />
        <div className="about-grid">
          <div className="about-body reveal"><p>I’m Richa Singh, a Computer Science & Engineering (AI) student who enjoys building practical applications and exploring how technology can solve real problems. My work spans AI/ML, full-stack development, backend systems, and hackathon projects.</p><p>I’m currently exploring AI/ML and System Design while building practical projects and strengthening my software engineering skills.</p><div className="interest-list"><span><Zap size={15} /> Artificial Intelligence</span><span><Terminal size={15} /> Full Stack Development</span><span><BrainCircuit size={15} /> System Design</span></div></div>
          <TiltCard className="profile-card reveal"><div className="profile-image"><img src={profilePhoto} alt="Richa Singh" /><div className="profile-stamp">CSE<br /><b>AI</b></div></div><div className="profile-meta"><span>Based in India</span><span>Building with intent.</span></div></TiltCard>
        </div>
      </section>

      <section className="section-shell education-section" id="education">
        <SectionHeading eyebrow="02 / Education" title="Education and milestones." />
        <div className="education-layout">
          <div className="timeline reveal"><div className="timeline-line" /><article><span className="timeline-dot" /><div className="date-label">2024–2028</div><h3>B.Tech in Computer Science & Engineering (AI)</h3><p>UIET, CSJMU, Kanpur</p></article></div>
          <div className="metrics reveal"><div><span>10th Percentage</span><strong>88.5<sup>%</sup></strong></div><div><span>12th Percentage</span><strong>92.4<sup>%</sup></strong></div><div><span>4th Semester SGPA</span><strong>8.24</strong></div><div className="topper"><Award size={25} /><span>Achievement</span><strong>First Position in Class 12</strong><small>School topper.</small></div></div>
        </div>
      </section>

      <section className="section-shell certificates-section" id="certificates">
        <SectionHeading eyebrow="03 / Certificates" title={<>Proof of progress,<br /><span>not a checklist.</span></>} text="Selected certificates and achievements." />
        <div className="certificate-grid reveal">{[[classAwardPhoto, 'Class 12 School Topper', 'Academic achievement'], [hindalcoCertificate, 'Hindalco Internship Certificate', 'Hindalco Industries Limited'], [ibmCertificate, "IBM BOB Hacks '26", 'Grand Finalist'], [avinyaCertificate, 'IIT Guwahati Avinya', 'IIT Guwahati']].map(([image, title, organization]) => <button className="certificate-card" key={title} onClick={() => setSelectedCertificate(image)}><div className="certificate-image"><CertificatePreview src={image} alt={title} /><ExternalLink size={16} /></div><div className="certificate-info"><span className="eyebrow">Certificate</span><h3>{title}</h3><p>{organization}</p><strong>View certificate <ArrowUpRight size={15} /></strong></div></button>)}</div>
      </section>

      <section className="section-shell stack-section" id="stack">
        <SectionHeading eyebrow="04 / Tech stack" title={<>Tools for turning<br /><span>curiosity into code.</span></>} />
        <div className="stack-grid reveal">{Object.entries(stack).map(([category, items]) => <div className="stack-group" key={category}><h3>{category}</h3><div>{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
      </section>

      <section className="section-shell experience-section" id="experience">
        <SectionHeading eyebrow="05 / Experience" title="Where learning meets practice." />
        <TiltCard className="experience-card reveal"><div className="experience-mark"><BriefcaseBusiness size={32} /><span>ABG</span></div><div className="experience-main"><div className="experience-top"><div><span className="eyebrow">IT Internship</span><h3>Hindalco Industries Limited</h3><p>Aditya Birla Group · Renukoot</p></div><span className="placeholder-pill">Excellent</span></div><div className="experience-details"><div><span>Role</span><strong>IT Intern</strong></div><div><span>Duration</span><strong>29 May – 15 Jul 2026</strong></div><div><span>Department</span><strong>Information & Technology</strong></div></div><p className="placeholder-copy">Completed an IT internship at Hindalco Industries Limited, working on an AI-Based Predictive Energy Monitoring System.</p><div className="experience-media"><img src={internshipPhoto} alt="Hindalco internship" /><img src={internshipCupPhoto} alt="Hindalco internship" /></div></div></TiltCard>
      </section>

      <section className="section-shell hackathons-section" id="hackathons">
        <SectionHeading eyebrow="06 / Hackathons" title="Built under pressure.<br /><span>Selected with purpose.</span>" />
        <div className="hackathon-grid reveal"><TiltCard className="hack-card"><div className="hack-top"><span className="hack-number">01</span><span className="finalist">Grand Finalist</span></div><div className="hack-logo"><Radio size={25} /> IBM <b>bob</b></div><h3>IBM BOB Hacks '26</h3><p>Grand Finalist at IBM BOB Hacks '26.</p><div className="hack-footer"><img src={ibmGroupPhoto} alt="IBM BOB Hacks group" onClick={() => setSelectedCertificate(ibmGroupPhoto)} role="button" tabIndex="0" /><ArrowUpRight size={17} /></div></TiltCard><TiltCard className="hack-card featured"><div className="hack-top"><span className="hack-number">02</span><span className="finalist">Finalist</span></div><div className="hack-logo"><Sparkles size={25} /> AVINYA</div><h3>IIT Guwahati Avinya</h3><p>Finalist at Avinya, IIT Guwahati.</p><div className="hack-footer"><img src={avinyaGroupPhoto} alt="Avinya group" onClick={() => setSelectedCertificate(avinyaGroupPhoto)} role="button" tabIndex="0" /><ArrowUpRight size={17} /></div></TiltCard></div>
      </section>

      <section className="section-shell projects-section" id="projects">
        <div className="projects-heading"><SectionHeading eyebrow="07 / Selected work" title={<>A few things I’ve<br /><span>made along the way.</span></>} /><a className="text-link" href="https://github.com/richasingh311018">View GitHub <ArrowUpRight size={16} /></a></div>
        <div className="projects-list">{projects.map(project => <TiltCard className={`project-card reveal ${project.tone}`} key={project.name}><div className="project-visual"><div className="visual-placeholder"><span>{project.image}</span><div className="visual-lines" /></div><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span></div><div className="project-content"><h3>{project.name}</h3><p>{project.description}</p><div className="feature-row">{project.features.map(feature => <span key={feature}>{feature}</span>)}</div><div className="project-bottom"><div className="tech-row">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div><a href="https://github.com/richasingh311018" aria-label={`View ${project.name} on GitHub`}><Github size={18} /></a></div></div></TiltCard>)}</div>
      </section>

      <section className="section-shell beyond-section" id="beyond">
        <div className="beyond-copy reveal"><SectionHeading eyebrow="08 / Beyond code" title={<>The person behind<br /><span>the projects.</span></>} /><p>Good ideas don’t only come from a screen. I make room for the things that keep me grounded, curious, and moving.</p></div>
        <div className="beyond-cards"><TiltCard className="beyond-card reveal"><span className="hobby-icon">🥋</span><h3>Taekwondo</h3><p>A hobby and personal interest.</p></TiltCard><TiltCard className="beyond-card reveal"><span className="hobby-icon">🎤</span><h3>Singing</h3><p>A creative outlet and one of the ways I recharge.</p></TiltCard></div>
      </section>

      <section className="learning-strip section-shell reveal"><div className="learning-icon"><Sparkles size={24} /></div><div><span className="eyebrow">Currently exploring</span><h2>AI/ML and System Design.</h2><p>Currently exploring AI/ML, System Design, Backend Engineering, and Full-Stack Development while building practical projects.</p></div><div className="orbit"><span>AI</span><span>API</span><span>DB</span></div></section>

      <section className="contact-section section-shell" id="contact"><div className="contact-inner reveal"><span className="eyebrow">09 / Contact</span><h2>Let's build<br /><em>something.</em></h2><p>Have an idea, opportunity, or interesting problem?<br />Let’s connect.</p><a className="button primary" href="mailto:YOUR_EMAIL">Start a conversation <ArrowUpRight size={17} /></a><div className="contact-links"><a href="mailto:YOUR_EMAIL"><Mail size={17} /> YOUR_EMAIL</a><a href="https://www.linkedin.com/in/richa-singh-060853314/"><Linkedin size={17} /> LinkedIn</a><a href="https://github.com/richasingh311018"><Github size={17} /> GitHub</a></div></div></section>
    </main>
    {selectedCertificate && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedCertificate(null)}><div className="lightbox-card" onClick={event => event.stopPropagation()}><button onClick={() => setSelectedCertificate(null)} aria-label="Close certificate preview"><X /></button><CertificatePreview src={selectedCertificate} alt="Certificate preview" /><p>Certificate preview</p></div></div>}
    <footer className="footer section-shell"><span>© 2026 RICHA SINGH</span><span>Designed & built with intention.</span><a href="#home" onClick={() => goTo('home')} aria-label="Back to top"><MoveUpRight size={16} /></a></footer>
  </>;
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
