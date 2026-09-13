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
  Languages: ['Python', 'C++', 'Java', 'JavaScript'],
  Development: ['HTML', 'CSS', 'React', 'Node.js', 'Express', 'FastAPI', 'Tailwind CSS', 'Bootstrap'],
  Database: ['MySQL', 'MongoDB'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Docker'],
  Cloud: ['AWS', 'Cloud / Deployment'],
  'Core Concepts': ['OOPS', 'DSA', 'OS', 'DBMS']
};

const projects = [
  { number: '01', name: 'AI-Based Predictive Energy Monitoring System', type: 'Hindalco internship project', description: 'An AI-based system for monitoring energy consumption, analyzing usage patterns, detecting anomalies, and identifying inefficient energy usage.', tech: ['Python', 'AI / ML'], image: 'projects/energy-monitoring.jpg', features: ['Usage pattern analysis', 'Anomaly detection', 'Inefficient usage detection'], tone: 'pink', githubUrl: 'https://github.com/richasingh311018/ai-energy-monitoring-system.git' },
  { number: '02', name: 'SUNOSAATHI', type: 'Voice-first platform', description: 'A voice-first financial inclusion platform designed to make digital financial services easier to access for users with limited digital literacy.', tech: ['React', 'Tailwind', 'Voice AI', 'OCR'], image: 'projects/sunosaathi.jpg', features: ['Voice-first access', 'Accessible UX', 'Financial inclusion'], tone: 'blue', githubUrl: 'https://github.com/richasingh311018/sunosathii.git' }
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

function CertificatePreview({ src, alt, rotated = false }) {
  return src.endsWith('.pdf')
    ? <iframe src={src} title={alt} />
    : <img className={rotated ? 'certificate-rotated' : ''} src={src} alt={alt} />;
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
          <h1 className="hero-name">Richa Singh</h1>
          <h2 className="hero-role">MERN Stack<br /><em>Developer.</em></h2>
          <p className="hero-intro">MERN stack development, while learning AI/ML and System Design.</p>
          <div className="hero-actions"><a className="button primary" href="#projects" onClick={() => goTo('projects')}>View my work <ArrowUpRight size={17} /></a><button className="button secondary" type="button" onClick={() => setSelectedCertificate({ src: '/assets/resume.pdf', alt: 'Richa Singh resume' })}><Download size={16} /> View my resume</button></div>
          <div className="social-row"><span>Find me on</span><a href="https://www.linkedin.com/in/richa-singh-060853314/" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="https://github.com/richasingh311018" aria-label="GitHub"><Github size={18} /></a><a href="mailto:richasingh311018@gmail.com" aria-label="Email"><Mail size={18} /></a></div>
        </div>
        <div className="hero-art" aria-label="Abstract interactive developer workspace">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="grid-plane" />
          <div className="code-window">
            <div className="window-bar"><span /><span /><span /><label>intelligence.py</label></div>
            <pre><code><b>class</b> <i>Builder</i>:
  focus = <strong>"real-world AI"</strong>
  systems = <strong>"practical software"</strong>

  <b>def</b> <i>create</i>(self, idea):
    <b>return</b> idea.<u>make_useful</u>()</code></pre>
            <div className="window-status"><span><i /> running</span><small>127.0.0.1:3000</small></div>
          </div>
          <div className="floating-chip chip-ai"><BrainCircuit size={15} /> AI / ML</div>
          <div className="floating-chip chip-stack"><Code2 size={15} /> full stack</div>
          <div className="art-caption"><span>01</span><span>AI → applications</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span>Scroll down</span><ChevronDown size={17} /></a>
      </section>

      <section className="section-shell about-section" id="about">
        <SectionHeading eyebrow="01 / About" title={<>MERN stack<br /><span>developer.</span></>} text="Building full-stack web applications with the MERN stack while learning AI/ML and System Design." />
        <div className="about-grid">
          <div className="about-body reveal"><p>I’m Richa Singh, a 3rd-year B.Tech CSE (AI) student currently pursuing my degree from UIET, CSJMU. I am a MERN stack developer with experience at Hindalco, Aditya Birla Group, and I am recently learning AI/ML and System Design.</p><div className="interest-list"><span><Terminal size={15} /> MERN Stack Development</span><span><Zap size={15} /> Artificial Intelligence &amp; ML</span><span><BrainCircuit size={15} /> System Design</span></div></div>
          <TiltCard className="profile-card reveal"><div className="profile-image"><img src={profilePhoto} alt="Richa Singh" /><div className="profile-stamp">CSE<br /><b>AI</b></div></div><div className="profile-meta"><span>Based in India</span><span>MERN stack developer</span></div></TiltCard>
        </div>
      </section>

      <section className="section-shell education-section" id="education">
        <SectionHeading eyebrow="02 / Education" title="Education." />
        <div className="education-layout">
          <div className="timeline reveal"><div className="timeline-line" /><article><span className="timeline-dot" /><div className="date-label">2024–2028</div><h3>B.Tech in Computer Science & Engineering (AI)</h3><p>UIET, CSJMU, Kanpur</p></article></div>
          <div className="metrics reveal"><div><span>10th Percentage</span><strong>88.5<sup>%</sup></strong></div><div><span>12th Percentage</span><strong>92.4<sup>%</sup></strong></div><div><span>4th Semester SGPA</span><strong>8.24</strong></div><div className="topper"><Award size={25} /><span>Achievement</span><strong>Awarded 1st position in Class 12</strong></div></div>
        </div>
      </section>

      <section className="section-shell certificates-section" id="certificates">
        <SectionHeading eyebrow="03 / Certificates" title={<>Certificates<br /><span>and achievements.</span></>} />
        <div className="certificate-grid reveal">{[[classAwardPhoto, 'Class 12 Achievement', 'Academic achievement', false], [hindalcoCertificate, 'Hindalco Internship Certificate', 'Hindalco Industries Limited', false], [ibmCertificate, "IBM BOB Hacks '26", 'Grand Finalist', true], [avinyaCertificate, 'IIT Guwahati Avinya', 'IIT Guwahati', true]].map(([image, title, organization, rotated]) => <button className="certificate-card" key={title} onClick={() => setSelectedCertificate({ src: image, alt: title, rotated })}><div className="certificate-image"><CertificatePreview src={image} alt={title} rotated={rotated} /><ExternalLink size={16} /></div><div className="certificate-info"><span className="eyebrow">Certificate</span><h3>{title}</h3><p>{organization}</p><strong>View certificate <ArrowUpRight size={15} /></strong></div></button>)}</div>
      </section>

      <section className="section-shell stack-section" id="stack">
        <SectionHeading eyebrow="04 / Tech stack" title={<>Technologies<br /><span>I use.</span></>} />
        <div className="stack-grid reveal">{Object.entries(stack).map(([category, items]) => <div className="stack-group" key={category}><h3>{category}</h3><div>{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>
      </section>

      <section className="section-shell experience-section" id="experience">
        <SectionHeading eyebrow="05 / Experience" title="Internship experience." />
        <TiltCard className="experience-card reveal"><div className="experience-mark"><BriefcaseBusiness size={32} /><span>ABG</span></div><div className="experience-main"><div className="experience-top"><div><span className="eyebrow">IT Internship</span><h3>Hindalco Industries Limited</h3><p>Aditya Birla Group · Renukoot</p></div><span className="placeholder-pill">Excellent</span></div><div className="experience-details"><div><span>Role</span><strong>IT Intern</strong></div><div><span>Duration</span><strong>29 May 2026 – 15 July 2026</strong></div><div><span>Department</span><strong>Information & Technology</strong></div></div><p className="placeholder-copy">Completed an IT internship at Hindalco Industries Limited, working on an AI-Based Predictive Energy Monitoring System.</p><div className="experience-media"><img src={internshipPhoto} alt="Hindalco internship building" onClick={() => setSelectedCertificate({ src: internshipPhoto, alt: 'Hindalco internship building' })} role="button" tabIndex="0" /><img src={internshipCupPhoto} alt="Hindalco internship cup" onClick={() => setSelectedCertificate({ src: internshipCupPhoto, alt: 'Hindalco internship cup' })} role="button" tabIndex="0" /></div></div></TiltCard>
      </section>

      <section className="section-shell hackathons-section" id="hackathons">
        <SectionHeading eyebrow="06 / Hackathons" title={<>Hackathon<br /><span>achievements.</span></>} />
        <div className="hackathon-grid reveal"><TiltCard className="hack-card"><div className="hack-top"><span className="hack-number">01</span><span className="finalist">Grand Finalist</span></div><div className="hack-logo"><Radio size={25} /> IBM <b>bob</b></div><h3>IBM BOB Hacks '26</h3><p>Grand Finalist at IBM BOB Hacks '26.</p><div className="hack-footer"><img src={ibmGroupPhoto} alt="IBM BOB Hacks group" onClick={() => setSelectedCertificate({ src: ibmGroupPhoto, alt: 'IBM BOB Hacks group' })} role="button" tabIndex="0" /><ArrowUpRight size={17} /></div></TiltCard><TiltCard className="hack-card featured"><div className="hack-top"><span className="hack-number">02</span><span className="finalist">Finalist</span></div><div className="hack-logo"><Sparkles size={25} /> AVINYA</div><h3>IIT Guwahati Avinya</h3><p>Finalist at Avinya, IIT Guwahati.</p><div className="hack-footer"><img src={avinyaGroupPhoto} alt="Avinya group" onClick={() => setSelectedCertificate({ src: avinyaGroupPhoto, alt: 'Avinya group' })} role="button" tabIndex="0" /><ArrowUpRight size={17} /></div></TiltCard></div>
      </section>

      <section className="section-shell projects-section" id="projects">
        <div className="projects-heading"><SectionHeading eyebrow="07 / Selected work" title={<>Selected<br /><span>projects.</span></>} /><a className="text-link" href="https://github.com/richasingh311018">View GitHub <ArrowUpRight size={16} /></a></div>
        <div className="projects-list">{projects.map(project => <TiltCard className={`project-card reveal ${project.tone}`} key={project.name}><div className="project-visual"><div className="visual-placeholder"><span>{project.image}</span><div className="visual-lines" /></div><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span></div><div className="project-content"><h3>{project.name}</h3><p>{project.description}</p><div className="feature-row">{project.features.map(feature => <span key={feature}>{feature}</span>)}</div><div className="project-bottom"><div className="tech-row">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>{project.githubUrl && <a href={project.githubUrl} target={project.openInNewTab ? '_blank' : undefined} rel={project.openInNewTab ? 'noreferrer' : undefined} aria-label={`View ${project.name} on GitHub`}><Github size={18} /></a>}</div></div></TiltCard>)}</div>
      </section>

      <section className="section-shell beyond-section" id="beyond">
        <div className="beyond-copy reveal"><SectionHeading eyebrow="08 / Beyond code" title={<>Interests<br /><span>outside code.</span></>} /></div>
        <div className="beyond-cards"><TiltCard className="beyond-card reveal"><span className="hobby-icon">🥋</span><h3>Taekwondo</h3></TiltCard><TiltCard className="beyond-card reveal"><span className="hobby-icon">🎤</span><h3>Singing</h3></TiltCard></div>
      </section>

      <section className="learning-strip section-shell reveal"><div className="learning-icon"><Sparkles size={24} /></div><div><span className="eyebrow">Current focus</span><h2>AI/ML and System Design.</h2><p>Recently learning AI/ML and System Design alongside MERN stack development.</p></div><div className="orbit"><span>AI</span><span>API</span><span>DB</span></div></section>

      <section className="contact-section section-shell" id="contact"><div className="contact-inner reveal"><span className="eyebrow">09 / Contact</span><h2>Let's build<br /><em>something.</em></h2><p>Have an idea, opportunity, or interesting problem?<br />Let’s connect.</p><a className="button primary" href="mailto:richasingh311018@gmail.com">Start a conversation <ArrowUpRight size={17} /></a><div className="contact-links"><a href="mailto:richasingh311018@gmail.com"><Mail size={17} /> Email</a><a href="https://www.linkedin.com/in/richa-singh-060853314/"><Linkedin size={17} /> LinkedIn</a><a href="https://github.com/richasingh311018"><Github size={17} /> GitHub</a></div></div></section>
    </main>
    {selectedCertificate && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelectedCertificate(null)}><div className="lightbox-card" onClick={event => event.stopPropagation()}><button onClick={() => setSelectedCertificate(null)} aria-label="Close preview"><X /></button><CertificatePreview src={selectedCertificate.src} alt={selectedCertificate.alt} rotated={selectedCertificate.rotated} /><p>Preview</p></div></div>}
    <footer className="footer section-shell"><span>© 2026 RICHA SINGH</span><span>MERN stack developer</span><a href="#home" onClick={() => goTo('home')} aria-label="Back to top"><MoveUpRight size={16} /></a></footer>
  </>;
}

export default App;

createRoot(document.getElementById('root')).render(<App />);
