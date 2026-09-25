import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { studies, projects, experience, expertise } from './content';
import './App.css';

const BASE = import.meta.env.BASE_URL;
const STUDIES_PATH = `${BASE}case-studies/`;
const EMAIL = 'haseeb099m@gmail.com';

function Navigation({ isStudies }) {
  return (
    <header className="site-header">
      <a className="brand" href={BASE}>
        <span className="brand-mark">H</span>
        <span className="brand-text">
          Muhammad Haseeb
          <small>Software & ML Engineer</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a href={`${BASE}#work`}>Work</a>
        <a href={STUDIES_PATH} aria-current={isStudies ? 'page' : undefined}>
          Case studies
        </a>
        <a href={`${BASE}#contact`}>Contact</a>
      </nav>
    </header>
  );
}

function PageSection({ id, title, note, children, className = '', index }) {
  return (
    <section id={id} className={`page-section ${className}`}>
      <header className="section-header">
        {index && <span className="section-index" aria-hidden="true">{index}</span>}
        <div className="section-heading">
          <h2>{title}</h2>
          {note && <p>{note}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Home() {
  return (
    <main id="main" className="main-column">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <p className="kicker">Muhammad Haseeb</p>
        <h1 id="hero-title">Software engineer</h1>
        <ul className="hero-focus" aria-label="Areas of work">
          <li>Automation</li>
          <li>Model compression</li>
          <li>Inference optimization</li>
        </ul>
        <p className="hero-copy">
          I help teams build software, automate repetitive work, and improve how ML models
          run on their target hardware.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            Discuss a project
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href="#work">
            See my work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <dl className="hero-meta">
          <div>
            <dt>Currently</dt>
            <dd>Founding SWE · Team Lead at <strong>NEXA</strong></dd>
          </div>
          <div>
            <dt>Available for</dt>
            <dd><strong>Client projects</strong></dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd><strong>Lahore, Pakistan</strong></dd>
          </div>
        </dl>
      </section>

      <PageSection
        id="work"
        index="01"
        title="Selected work"
        note="Web applications, developer tools, and AI systems I’ve built."
      >
        <div className="project-list">
          {projects.slice(0, 4).map((project) => (
            <article className="project" key={project.name}>
              <div className="project-heading">
                <span className="project-category">{project.category}</span>
                <h3>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.name}
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                </h3>
              </div>
              <div className="project-description">
                <p>{project.description}</p>
                <p className="project-stack">{project.stack}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="archive-link" href={projects[4].url} target="_blank" rel="noreferrer">
          <span className="archive-label">Also built</span>
          <strong>{projects[4].name}</strong>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </PageSection>

      <PageSection
        id="case-studies"
        index="02"
        title="Case studies"
        note="Experiments in pruning, quantization, and knowledge distillation."
      >
        <div className="study-index">
          {studies.map((study, i) => (
            <a className="study-card" href={`${STUDIES_PATH}#${study.id}`} key={study.id}>
              <span className="study-card-index">0{i + 1}</span>
              <div className="study-card-body">
                <h3>{study.tag}</h3>
                <p>{study.summary}</p>
                <span className="study-result">{study.result}</span>
                <span className="study-card-cta">Read case study</span>
              </div>
              <ArrowRight size={18} className="study-card-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="disclaimer">
          Each study includes the setup, results, and limitations of an independent experiment.
        </p>
      </PageSection>

      <PageSection
        id="services"
        index="03"
        title="How I can help"
      >
        <div className="service-grid">
          {expertise.map((item, i) => (
            <article key={item.title}>
              <span className="service-index">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="process-note">
          <strong>How I work</strong>
          <p>
            I start by agreeing on the requirements and how we’ll evaluate the work.
            The handover includes source code, setup instructions, and relevant test results.
          </p>
        </aside>
      </PageSection>

      <PageSection id="experience" index="04" title="Experience">
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.company}>
              <div className="timeline-date">{item.period}</div>
              <div className="timeline-body">
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <a
          className="text-link research-link"
          href="https://ha405.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          Research portfolio
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </PageSection>

      <Contact />
    </main>
  );
}

function Contact() {
  const [status, setStatus] = useState('idle');

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xykolqow', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Message failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <PageSection id="contact" index="05" title="Contact" className="contact-section">
      <div className="contact-layout">
        <div className="contact-lead">
          <h3>Let’s talk.</h3>
          <p>
            Have a product to build or a feature to add? Tell me what you need, your current
            stack, and your timeline. You can also get in touch about engineering roles.
          </p>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            <Mail size={17} aria-hidden="true" />
            {EMAIL}
          </a>
        </div>

        <details className="contact-form-wrap">
          <summary>
            Send a message
            <span className="summary-icon" aria-hidden="true">+</span>
          </summary>
          <form onSubmit={submit}>
            <div className="form-row">
              <label>
                Name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label>
              Message
              <textarea name="message" rows="5" required />
            </label>
            <div className="form-actions">
              <button className="button button-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p role="status">
                {status === 'sent'
                  ? 'Thanks, your message has been sent.'
                  : status === 'error'
                    ? 'Unable to send. Please use the email link above.'
                    : ''}
              </p>
            </div>
          </form>
        </details>
      </div>
    </PageSection>
  );
}

function CaseStudies() {
  return (
    <main id="main" className="main-column studies-page">
      <header className="studies-hero">
        <a className="back-link" href={`${BASE}#case-studies`}>
          <ArrowLeft size={15} aria-hidden="true" />
          Portfolio
        </a>
        <p className="kicker">Technical case studies</p>
        <h1>
          Model compression
          <span>case studies.</span>
        </h1>
        <p className="studies-lead">
          Three experiments in making ML models smaller. Each study shows what changed
          in size, speed, and accuracy—and what that means when choosing a model to deploy.
        </p>
        <small>
          Figures are from the project records. Hardware and evaluation limitations are noted in each study.
        </small>
      </header>

      <div className="studies-layout">
        <aside className="studies-sidebar">
          <nav aria-label="On this page">
            <p>On this page</p>
            <a href="#study-overview">Overview</a>
            {studies.map((study, index) => (
              <a key={study.id} href={`#${study.id}`}>
                <span>0{index + 1}</span>
                {study.tag}
              </a>
            ))}
            <a href="#contact">Contact</a>
          </nav>
        </aside>

        <div className="studies-content">
          <nav className="study-tabs" id="study-overview" aria-label="Case study overview">
            <p className="study-tabs-label">Choose a case study</p>
            {studies.map((study, index) => (
              <a key={study.id} href={`#${study.id}`}>
                <span className="study-tab-index">0{index + 1}</span>
                <span className="study-tab-copy">
                  <strong>{study.tag}</strong>
                  <small>{study.result}</small>
                </span>
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            ))}
          </nav>

          {studies.map((study, index) => (
            <article className="full-study" id={study.id} key={study.id}>
              <header className="full-study-header">
                <span className="study-label">Study 0{index + 1}</span>
                <h2>{study.title}</h2>
                <p>{study.summary}</p>
                <span className="study-impact">{study.result}</span>
                <a href={study.repo} target="_blank" rel="noreferrer">
                  View source code
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </header>

              <div className="study-copy">
                <aside className="study-aside">
                  <h3>Why it matters</h3>
                  <p>{study.decision}</p>
                </aside>
                <section>
                  <h3>How I tested it</h3>
                  <p>{study.approach}</p>
                </section>

                <p className="table-hint">Scroll horizontally to see every column.</p>
                <div
                  className="table-scroll"
                  role="region"
                  aria-label={`${study.tag} results`}
                  tabIndex={0}
                >
                  <table>
                    <caption>Selected results</caption>
                    <thead>
                      <tr>
                        {study.columns.map((column) => (
                          <th scope="col" key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {study.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, cellIndex) =>
                            cellIndex === 0 ? (
                              <th scope="row" key={cellIndex}>{cell}</th>
                            ) : (
                              <td key={cellIndex}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <section>
                  <h3>What the results show</h3>
                  <p>{study.finding}</p>
                </section>
                <section>
                  <h3>Next test</h3>
                  <p>{study.nextStep}</p>
                </section>

                <details className="technical-note">
                  <summary>Technical note <span aria-hidden="true">+</span></summary>
                  <p>{study.technicalNote}</p>
                </details>

                <p className="study-limit">
                  <strong>Scope:</strong> {study.limit}
                </p>
              </div>
              <nav className="study-pagination" aria-label={`${study.tag} case study navigation`}>
                {index > 0 ? (
                  <a href={`#${studies[index - 1].id}`}>
                    <ArrowLeft size={15} aria-hidden="true" />
                    Previous: {studies[index - 1].tag}
                  </a>
                ) : (
                  <a href="#study-overview">
                    <ArrowLeft size={15} aria-hidden="true" />
                    Study overview
                  </a>
                )}
                {index < studies.length - 1 ? (
                  <a href={`#${studies[index + 1].id}`}>
                    Next: {studies[index + 1].tag}
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <a href="#contact">
                    Get in touch
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                )}
              </nav>
            </article>
          ))}

          <Contact />
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-copy">
        © {new Date().getFullYear()} Muhammad Haseeb
        <br />
        Lahore, Pakistan · UTC+5
      </span>
      <div className="social-links">
        <a href="https://github.com/ha405" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/muhammad-haseeb" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const isStudies = window.location.pathname.replace(/\/$/, '').endsWith('/case-studies');

  useEffect(() => {
    document.title = isStudies
      ? 'Model Compression Case Studies | Muhammad Haseeb'
      : 'Muhammad Haseeb | Software Engineer';
    const description = isStudies
      ? 'Experiments in pruning, quantization, and knowledge distillation by Muhammad Haseeb, with methods, results, and limitations.'
      : 'Muhammad Haseeb is a software engineer working on automation, model compression, and inference optimization. Explore selected work and case studies.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(hash))?.scrollIntoView(),
      );
    }
  }, [isStudies]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-shell">
        <Navigation isStudies={isStudies} />
        {isStudies ? <CaseStudies /> : <Home />}
        <Footer />
      </div>
    </>
  );
}
