import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import './App.css';

const DATA = {
  name: 'Muhammad Haseeb',
  title: 'Software Engineer & ML Systems',
  location: 'Lahore, Pakistan',
  email: 'haseeb099m@gmail.com',
  github: 'https://github.com/ha405',
  linkedin: 'https://linkedin.com/in/muhammad-haseeb',
  researchSite: 'https://ha405.github.io/',

  availability: 'Available for new projects',

  intro: 'I build AI systems that take work off your team, and make them cheap to run.',

  lede: 'Agents and pipelines wired into the tools you already run. When the models behind them get expensive, I make them smaller and faster without losing accuracy.',

  proof: [
    ['40%', 'memory cut on a production vision model'],
    ['35x', 'compression held in benchmarks'],
    ['99%', 'sparsity with accuracy intact'],
  ],

  about: [
    'My work sits between ML research and the engineering it takes to ship. Most of it comes down to one question: how small and how fast can a model get before it stops being useful?',
    'The research side is multi-objective pruning at extreme sparsity, post-training quantization for diffusion transformers, and what breaks when models train across non-IID data. The client side is the same set of techniques, pointed at a bill someone is already paying.',
  ],

  services: [
    {
      tag: 'Agents',
      name: 'Agents and automation',
      lead: 'Put the repetitive work on rails.',
      problem: 'Your team is probably doing work a system could do.',
      desc: "I build the agents and pipelines that take it over, and the product surface around them: tools wired into the software you already run, retrieval over your own code and documents, and evaluation so you can see when quality slips. They run unattended, and they fail loudly instead of quietly.",
      points: [
        'Full-stack product engineering, frontend to backend',
        'Multi-agent systems and tool design',
        'MCP servers over your internal tools',
        'Retrieval over codebases and documents',
        'Ingestion, labeling, and retraining pipelines',
        'Evaluation harnesses and guardrails',
      ],
    },
    {
      tag: 'Inference',
      name: 'Faster, cheaper inference',
      lead: 'Cut the cost of every request.',
      problem: 'Most models in production are bigger than the job needs.',
      desc: "I take your checkpoint, compress it, and export it to the runtime that fits your hardware. Then I benchmark it against an accuracy floor you set. If it does not clear the floor, you keep the old one.",
      points: [
        'INT8 and W4A8 post-training quantization',
        'Structured pruning and knowledge distillation',
        'ONNX and TensorRT export and benchmarking',
        'Latency, memory, and cost per request tuning',
        'Edge and single GPU deployment',
      ],
    },
  ],

  process: [
    { step: '01', title: 'Call', desc: 'You tell me what you run and what it costs you now. Half an hour is usually enough.' },
    { step: '02', title: 'Audit', desc: 'I benchmark what you have and write up what can be cut, with numbers and a scope.' },
    { step: '03', title: 'Build', desc: 'I do the work and hand over the code, the benchmarks, and how to run it again.' },
  ],

  work: [
    {
      role: 'Founding Product Engineer',
      company: 'NEXA',
      note: 'Team Lead',
      period: 'Since May 2026',
      bullets: [
        'Own end-to-end product engineering: backend architecture, frontend delivery, and AI integration into production workflows.',
        'Lead technical and product decisions as a founding engineer, turning early customer needs into AI-powered features under rapid iteration.',
      ],
      stack: ['Next.js', 'Node.js', 'AWS'],
    },
    {
      role: 'OSS Engineer',
      company: 'DatacurveAI',
      note: 'YC S24',
      period: 'Dec 2025 to March 2026',
      bullets: [
        'Shipped features and fixed issues across core open-source ML repositories.',
        'Filtered training instances in the model training pipeline to improve performance on coding tasks.',
      ],
      stack: ['Python', 'MLOps', 'Systems'],
    },
    {
      role: 'Machine Learning Engineer',
      company: 'Innova Tech',
      period: 'Jul 2025 to Oct 2025',
      bullets: [
        'Quantized SmolVLM with INT8 across ONNX and TensorRT, cutting memory footprint by 40%.',
        'Gained 4% accuracy on production CNNs by reworking architecture and training configuration.',
        'Replaced manual data annotation with automated pipelines.',
      ],
      stack: ['TensorRT', 'ONNX', 'Quantization'],
    },
    {
      role: 'Research Engineer',
      company: 'LUMS / UIUC',
      note: 'Technical R&D',
      period: 'Since Jan 2025',
      bullets: [
        'Authored BaCP, a multi-objective pruning framework that holds accuracy at 99% sparsity.',
        'Diagnosed federated learning failure modes on non-IID data through circuit collapse analysis.',
        'Built 4-bit weight compression for diffusion models using Hessian-based quantization, with an MLP predicting parameters from SNR data.',
      ],
      stack: ['PyTorch', 'Federated Learning', 'Compression'],
    },
  ],

  projects: [
    {
      year: '2025',
      name: 'Diffusion Quantization',
      summary: 'PTQ for diffusion transformers',
      desc: 'Log-SNR dependent timestep quantization with Fourier embeddings, combined with the Qronos W4A8 algorithm. Adaptive Hessian dampening and sequential block calibration keep second-order error from compounding across transformer blocks, so generation stays stable at reduced bit-widths.',
      facts: [
        ['W4A8', 'Weight / activation precision'],
        ['Log-SNR TDQ', 'Adaptive activation scaling'],
      ],
      tags: ['PyTorch', 'Diffusers', 'Qronos'],
      links: [{ label: 'Repository', url: 'https://github.com/ha405/AI624-Diffusion_Quantization' }],
    },
    {
      year: '2025',
      name: 'Full-Stack Development Agent',
      summary: 'Multi-agent app development',
      desc: 'Specialized agents handle Figma-to-code translation, workspace scaffolding, and iterative function generation. Frontend and backend agents run concurrently under an A2A protocol, coordinating through a shared workspace until the application builds and deploys.',
      facts: [
        ['A2A', 'Agent-to-agent orchestration'],
        ['asyncio', 'Parallel frontend & backend'],
      ],
      tags: ['TypeScript', 'Google ADK', 'Figma MCP'],
      links: [{ label: 'Repository', url: 'https://github.com/ha405/FullStackAgent' }],
    },
    {
      year: '2024',
      name: 'Model Compression Suite',
      summary: 'Pruning, quantization, distillation',
      desc: 'Custom implementations of structured channel pruning, K-Means and linear quantization, and knowledge distillation with feature-level hint loss. All three run against the same backbone, so the accuracy each technique costs is directly comparable.',
      facts: [
        ['35×', 'Compression, K-Means quantization'],
        ['40%', 'Latency gain, channel pruning'],
      ],
      tags: ['PyTorch', 'Pruning', 'Distillation'],
      links: [
        { label: 'Quantization', url: 'https://github.com/ha405/Quantization' },
        { label: 'Distillation', url: 'https://github.com/ha405/Knowledge-Distillation/tree/master' },
        { label: 'Pruning', url: 'https://github.com/ha405/Pruning' },
      ],
    },
    {
      year: '2024',
      name: 'Codebase RAG over MCP',
      summary: 'Semantic code search over MCP',
      desc: 'A Node.js JSON-RPC server implementing the Model Context Protocol, giving language models a uniform interface to repositories. A Gemini-driven RAG pipeline sits on top for documentation generation and semantic retrieval across distributed codebases.',
      facts: [
        ['JSON-RPC', 'MCP server interface'],
        ['Gemini', 'Retrieval & generation'],
      ],
      tags: ['Node.js', 'MCP', 'RAG'],
      links: [{ label: 'Repository', url: 'https://github.com/ha405/Model-Context-Protocol' }],
    },
    {
      year: '2024',
      name: 'Multi-Agent AutoML',
      summary: 'Planner, learner, visualizer agents',
      desc: 'Each agent owns one stage, ingestion through model orchestration to visualization, and passes context forward. Model execution is containerized so experiments stay reproducible between runs.',
      facts: [
        ['Docker', 'Containerized execution'],
        ['Planner / Learner', 'Task decomposition'],
      ],
      tags: ['Python', 'Flask', 'React'],
      links: [{ label: 'Repository', url: 'https://github.com/ha405/AutoML' }],
    },
    {
      year: '2023',
      name: 'Urdu News Classification',
      summary: 'Low-resource language classification',
      desc: 'A preprocessing pipeline built on UrduHack normalization and diacritic removal, then a comparison of architectures on the same corpus, from multinomial Naïve Bayes through L2-regularized logistic regression to PyTorch neural networks.',
      facts: [
        ['98%', 'Accuracy, multinomial Naïve Bayes'],
        ['UrduHack', 'Custom normalization pipeline'],
      ],
      tags: ['NLP', 'PyTorch', 'scikit-learn'],
      links: [{ label: 'Repository', url: 'https://github.com/ha405/Urdu-News-Classification-with-ML' }],
    },
  ],

  caseStudies: [
    {
      tag: 'Case study',
      title: 'How much can a model shrink before something breaks?',
      objective:
        'Every model earmarked for production carries a hidden question: how much of its size is load-bearing, and how much is margin nobody has actually tested? Two compression methods can promise a similar footprint and land in completely different places on accuracy, and the only way to find out which is which is to run both against the same baseline and see exactly where each one breaks.',
      approach: [
        "The method holds the model, the data, and the evaluation harness constant, then runs more than one compression technique against that same baseline so the failures are comparable instead of incidental. Fixed-point quantization forces every weight onto an evenly spaced grid regardless of how those weights are actually distributed. Clustering-based quantization instead learns where the weight distribution is dense and spends its precision there. Both were tested at 8-bit and 4-bit, with cluster centroids fine-tuned afterward to recover what the compression step predictably costs.",
        "For this run: a VGG16-BN classifier (the chenyaofo/pytorch-cifar-models public CIFAR benchmark checkpoint) on CIFAR-10, compressed via fixed-point linear quantization and via per-layer K-means weight clustering, at 8-bit and 4-bit, evaluated on the same held-out test set with the same profiling harness throughout.",
      ],
      baseline: { label: 'FP32 baseline', size: '58.25 MB', latency: '7.6 ms' },
      results: [
        { method: 'Linear quantization, 8-bit', size: '14.57 MB', accuracy: '93.6% top-1 (−0.1 pt)' },
        { method: 'K-means clustering, 8-bit', size: '14.67 MB', accuracy: '93.5% top-1 (−0.2 pt)' },
        { method: 'K-means clustering, 4-bit', size: '14.66 MB', accuracy: '82.4% top-1 (−11.2 pt)' },
        { method: 'Linear quantization, 4-bit', size: '14.57 MB', accuracy: '67.5% top-1 (−26.1 pt)' },
      ],
      note: "At 8-bit, method barely matters: both hold within 0.2 points of the uncompressed baseline. At 4-bit they split hard, an 11-point drop for clustering against a 26-point drop for fixed-point quantization on the identical model and data, because clustering adapts to the weight distribution and fixed-point quantization doesn't. Two caveats worth stating plainly: on-disk size barely moved between 8-bit and 4-bit, since naive tensor serialization doesn't pack sub-byte values without custom bit-packing, so the realized compression here is roughly 4x against a theoretical ceiling closer to 8x. And nothing in this table ran faster than the FP32 baseline, since simulated low-bit weights still get dequantized to FP32 before every forward pass without a runtime built for low-bit compute — a real deployment win needs an export step (ONNX or TensorRT) on top of this, not instead of it. Structured pruning was tested too, as a further axis with its own overhead; the complete matrix is in the repository below.",
      repo: 'https://github.com/ha405/Quantization',
    },
  ],

  research: [
    {
      lab: 'CITY Lab, LUMS',
      title: 'Backbone Contrastive Pruning',
      desc: 'A multi-objective pruning framework that mitigates representational collapse in 99% sparse networks, keeping feature extraction intact under extreme compression.',
    },
    {
      lab: 'Mechanistic Interpretability',
      title: 'Circuit Collapse in Federated Learning',
      desc: 'Reading weight divergence across non-IID client distributions as circuit collapse inside transformer blocks, to explain where federated training degrades.',
    },
    {
      lab: 'Domain Generalization',
      title: 'Domain-Invariant Circuits',
      desc: 'Decomposing models into domain-invariant and domain-specific circuits to understand what survives a significant distribution shift.',
    },
  ],

  oss: [
    {
      repo: 'huggingface/pytorch-image-models',
      desc: 'F1, precision, and recall metrics for single-GPU and DDP training evaluation.',
      url: 'https://github.com/huggingface/pytorch-image-models',
    },
    {
      repo: 'adapter-hub/adapters',
      desc: 'PEFT support for Group Query Attention models; fixed tensor shape mismatches.',
      url: 'https://github.com/adapter-hub/adapters',
    },
  ],

  stack: [
    { label: 'Languages', items: ['Python', 'C++', 'Rust', 'TypeScript', 'SQL'] },
    { label: 'ML', items: ['PyTorch', 'Transformers', 'Diffusers', 'ONNX', 'TensorRT'] },
    { label: 'Infrastructure', items: ['Docker', 'Linux', 'Git', 'FastAPI', 'CUDA'] },
  ],

  focus: ['Model compression', 'Efficient inference', 'Mechanistic interpretability', 'ML on edge'],
};

/* This site has exactly two routes: the home scroll, and the dedicated
   case studies page. No router dependency needed for that. */
const BASE = import.meta.env.BASE_URL;
const CASE_STUDIES_PATH = `${BASE}case-studies`;

const SECTIONS = [
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  return pathname;
}

function scrollToId(id, attemptsLeft = 12) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else if (attemptsLeft > 0) requestAnimationFrame(() => scrollToId(id, attemptsLeft - 1));
}

/* Handles a bare path, a same-page hash, or path#hash (jumping to a home
   section from the case studies page). pushState never fires popstate, so
   it's dispatched manually to notify usePathname. */
function navigateTo(to) {
  const [path, hash] = to.split('#');
  const targetPath = path || BASE;
  const changingPage = window.location.pathname !== targetPath;

  window.history.pushState({}, '', to);
  if (changingPage) window.dispatchEvent(new PopStateEvent('popstate'));

  if (hash) {
    if (changingPage) requestAnimationFrame(() => scrollToId(hash));
    else scrollToId(hash);
  }
}

/* A same-origin link that navigates client-side, but still degrades to a
   normal anchor tag for new-tab clicks and with JS disabled. */
function RouteLink({ to, className, children, ...rest }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigateTo(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* Pulls figures out of body copy so they can be found at a glance.
   No /g flag: String.split honours the capture group either way, and a global
   regex would carry lastIndex between test() calls. */
const FIGURE = /(\d+(?:\.\d+)?%|\b\d+x\b|\b\d+-bit\b|\bINT8\b|\bW4A8\b)/;

function withFigures(text) {
  return text.split(FIGURE).map((part, i) =>
    FIGURE.test(part) ? (
      <strong className="figure" key={i}>
        {part}
      </strong>
    ) : (
      part
    )
  );
}

/* Reveals a block once, as it enters the viewport. */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ id, index, title, deck, children, aside }) {
  const ref = useReveal();
  return (
    <section id={id} className="section reveal" ref={ref}>
      <div className="section-head">
        <div className="section-headline">
          <span className="section-index">{index}</span>
          <h2 className="section-title">{title}</h2>
          {deck && <p className="section-deck">{deck}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

/* Persistent left rail. Collapses to a top bar under 960px. */
function Rail({ theme, onToggleTheme, pathname }) {
  const [active, setActive] = useState('');
  const isHome = pathname === BASE;
  const isCaseStudies = pathname === CASE_STUDIES_PATH;
  const initials = DATA.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  /* Re-observes on every route change: the section elements only exist
     while the home page is mounted. Stale `active` state while away from
     home is harmless since the render below gates on isHome too. */
  useEffect(() => {
    if (!isHome) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  return (
    <aside className="rail">
      <div className="rail-head">
        <RouteLink to={BASE} className="rail-mark">
          <span className="rail-monogram">{initials}</span>
          <span className="rail-id">
            <span className="rail-name">{DATA.name}</span>
            <span className="rail-role">{DATA.title}</span>
          </span>
        </RouteLink>
        <p className="status">
          <span className="status-dot" aria-hidden="true" />
          {DATA.availability}
        </p>
      </div>

      <nav className="rail-group rail-group--nav" aria-label="Sections">
        <span className="rail-label">Menu</span>
        <div className="rail-nav">
          {SECTIONS.map((s, i) => (
            <RouteLink
              key={s.id}
              to={`${BASE}#${s.id}`}
              className={`rail-link${isHome && active === s.id ? ' is-active' : ''}`}
            >
              <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="rail-text">{s.label}</span>
            </RouteLink>
          ))}
          <RouteLink
            to={CASE_STUDIES_PATH}
            className={`rail-link${isCaseStudies ? ' is-active' : ''}`}
          >
            <span className="rail-num rail-num--icon">
              <ArrowUpRight size={12} />
            </span>
            <span className="rail-text">Case studies</span>
          </RouteLink>
        </div>
      </nav>

      <div className="rail-group rail-group--focus">
        <span className="rail-label">Working on</span>
        <ul className="rail-focus">
          {DATA.services.map((s) => (
            <li key={s.name}>
              <RouteLink to={`${BASE}#services`}>{s.name}</RouteLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="rail-foot">
        <p className="rail-place">
          <span>{DATA.location}</span>
          <span className="rail-tz">UTC+5</span>
        </p>
        <RouteLink to={`${BASE}#contact`} className="rail-cta">
          Start a project <ArrowUpRight size={14} />
        </RouteLink>
        <div className="rail-icons">
          <a href={DATA.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href={DATA.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${DATA.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
          <button
            type="button"
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <h1 className="hero-title">{DATA.intro}</h1>
      <p className="hero-lede">{DATA.lede}</p>

      <div className="hero-actions">
        <a className="btn btn--primary" href="#contact">
          Start a project <ArrowUpRight size={14} />
        </a>
        <a className="btn" href={`mailto:${DATA.email}`}>
          {DATA.email}
        </a>
      </div>

      <dl className="proof-strip">
        {DATA.proof.map(([value, label]) => (
          <div className="proof-item" key={label}>
            <dt className="proof-value">{value}</dt>
            <dd className="proof-label">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Services() {
  return (
    <Section
      id="services"
      index="01"
      title="What I do"
      deck="Two ways I usually help. Most projects start with one and grow into the other."
      aside={
        <a className="link-arrow" href="#contact">
          Start a project <ArrowUpRight size={14} />
        </a>
      }
    >
      <div className="service-grid">
        {DATA.services.map((s, i) => (
          <article className="service" key={s.name}>
            <div className="service-head">
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mono-sm">{s.tag}</span>
            </div>
            <h3 className="service-name">{s.name}</h3>
            <p className="service-lead">{s.lead}</p>
            <p className="service-problem">{s.problem}</p>
            <p className="service-desc">{s.desc}</p>
            <ul className="checks">
              {s.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="panel-block">
        <span className="panel-label mono-sm">How it works</span>
        <ol className="steps">
          {DATA.process.map((s) => (
            <li key={s.step}>
              <span className="step-num">{s.step}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="rows">
        {DATA.work.map((w) => (
          <li className="row" key={w.company}>
            <div className="row-meta">
              <span className="mono-sm">{w.period}</span>
            </div>
            <div className="row-body">
              <h3 className="row-title">
                {w.role} <span className="row-at">at</span> {w.company}
                {w.note && <span className="badge">{w.note}</span>}
              </h3>
              <ul className="bullets">
                {w.bullets.map((b) => (
                  <li key={b}>{withFigures(b)}</li>
                ))}
              </ul>
              <ul className="tags">
                {w.stack.map((t) => (
                  <li className="tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Project({ p, isOpen, onToggle }) {
  const panelId = `project-${p.name.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <li className={`index-row${isOpen ? ' is-open' : ''}`}>
      <h3 className="index-heading">
        <button
          type="button"
          className="index-head"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="index-year">{p.year}</span>
          <span className="index-name">{p.name}</span>
          <span className="index-summary">{p.summary}</span>
          <span className="index-metric">{p.facts[0][0]}</span>
          <span className="index-chevron" aria-hidden="true">
            <ChevronDown size={16} />
          </span>
        </button>
      </h3>

      <div className={`panel${isOpen ? ' is-open' : ''}`} id={panelId} inert={!isOpen}>
        <div className="panel-clip">
          <div className="panel-body">
            <p className="row-desc">{withFigures(p.desc)}</p>
            <dl className="facts">
              {p.facts.map(([value, label]) => (
                <div className="fact" key={label}>
                  <dt className="fact-value">{value}</dt>
                  <dd className="fact-label">{label}</dd>
                </div>
              ))}
            </dl>
            <ul className="tags">
              {p.tags.map((t) => (
                <li className="tag" key={t}>
                  {t}
                </li>
              ))}
            </ul>
            <div className="row-links">
              {p.links.map((l) => (
                <a className="link-arrow" key={l.url} href={l.url} target="_blank" rel="noreferrer">
                  {l.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function Projects() {
  /* Every row starts collapsed; "Expand all" is the only bulk control. */
  const [open, setOpen] = useState(() => new Set());
  const allOpen = open.size === DATA.projects.length;

  const toggle = (name) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const toggleAll = () =>
    setOpen(allOpen ? new Set() : new Set(DATA.projects.map((p) => p.name)));

  return (
    <Section
      id="projects"
      index="03"
      title="Selected projects"
      deck="Open a row for the detail. Code is on GitHub."
      aside={
        <button type="button" className="ghost-btn" onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
          <span className="mono-sm">{DATA.projects.length}</span>
        </button>
      }
    >
      <ol className="index">
        {DATA.projects.map((p) => (
          <Project key={p.name} p={p} isOpen={open.has(p.name)} onToggle={() => toggle(p.name)} />
        ))}
      </ol>
    </Section>
  );
}

/* One case study: objective/approach on the left, a verifiable results
   table on the right. Presentational only, so the page can list more than
   one once a second project has real published numbers. */
function CaseStudyEntry({ c }) {
  return (
    <article className="study">
      <div className="study-head">
        <span className="mono-sm">{c.tag}</span>
        <h2 className="study-title">{c.title}</h2>
      </div>
      <div className="study-grid">
        <div className="study-copy">
          <div className="study-block">
            <span className="mono-sm">Objective</span>
            <p className="prose">{c.objective}</p>
          </div>
          <div className="study-block">
            <span className="mono-sm">Approach</span>
            {c.approach.map((para) => (
              <p className="prose" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
          </div>
          <a className="link-arrow" href={c.repo} target="_blank" rel="noreferrer">
            Full results and code <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="study-table">
          <div className="study-row study-row--baseline">
            <span className="study-method">{c.baseline.label}</span>
            <span className="study-metric">{c.baseline.size}</span>
            <span className="study-metric">{c.baseline.latency}</span>
          </div>
          {c.results.map((r) => (
            <div className="study-row" key={r.method}>
              <span className="study-method">{r.method}</span>
              <span className="study-metric study-metric--accent">{r.size}</span>
              <span className="study-accuracy">{r.accuracy}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="study-note">{c.note}</p>
    </article>
  );
}

/* Its own page, not a stop on the home scroll: the point is a link you can
   send someone that lands directly on verifiable numbers. */
function CaseStudiesPage() {
  return (
    <div className="page">
      <RouteLink to={BASE} className="back-link">
        <ArrowLeft size={14} /> Back to overview
      </RouteLink>
      <header className="page-head">
        <span className="section-index">Case studies</span>
        <h1 className="page-title">Real work, real numbers</h1>
        <p className="section-deck">
          Deep dives on specific projects: the constraint, the method, and results checked
          against the code, not just claimed.
        </p>
      </header>
      <div className="study-list">
        {DATA.caseStudies.map((c) => (
          <CaseStudyEntry c={c} key={c.title} />
        ))}
      </div>
    </div>
  );
}

function Research() {
  return (
    <Section
      id="research"
      index="05"
      title="Research"
      deck="Ongoing work at LUMS and UIUC on compression and interpretability."
      aside={
        <a className="link-arrow" href={DATA.researchSite} target="_blank" rel="noreferrer">
          Full research portfolio <ArrowUpRight size={14} />
        </a>
      }
    >
      <div className="card-grid">
        {DATA.research.map((r) => (
          <article className="card" key={r.title}>
            <span className="card-tag">{r.lab}</span>
            <h3 className="card-title">{r.title}</h3>
            <p className="card-desc">{r.desc}</p>
          </article>
        ))}
      </div>

      <ul className="tags tags--wide">
        {DATA.focus.map((f) => (
          <li className="tag" key={f}>
            {f}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" index="06" title="About">
      <div className="about-grid">
        <div>
          {DATA.about.map((p) => (
            <p className="prose" key={p}>
              {p}
            </p>
          ))}
        </div>

        <div className="panel-block panel-block--tight">
          <span className="panel-label mono-sm">Open source</span>
          <ul className="oss">
            {DATA.oss.map((o) => (
              <li key={o.repo}>
                <a className="oss-repo" href={o.url} target="_blank" rel="noreferrer">
                  {o.repo} <ArrowUpRight size={13} />
                </a>
                <span className="oss-desc">{o.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stack-grid">
        {DATA.stack.map((group) => (
          <div className="stack-group" key={group.label}>
            <span className="mono-sm">{group.label}</span>
            <ul className="tags">
              {group.items.map((i) => (
                <li className="tag" key={i}>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ContactForm() {
  const [state, setState] = useState({ status: 'idle', message: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: 'sending', message: 'Sending…' });
    try {
      const res = await fetch('https://formspree.io/f/xykolqow', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      setState({ status: 'sent', message: 'Message sent. I’ll get back to you shortly.' });
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Email me directly instead.' });
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field-row">
        <label className="field">
          <span className="field-label">Name</span>
          <input className="input" type="text" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="field-label">Email</span>
          <input className="input" type="email" name="email" required autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span className="field-label">
          Message
          <span className="field-hint">model, hardware, current cost</span>
        </span>
        <textarea className="input textarea" name="message" rows="5" required />
      </label>
      <div className="form-foot">
        <button className="submit" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {state.message && (
          <p className={`form-status is-${state.status}`} role="status">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="contact" index="07" title="Start a project">
      <div className="contact-grid">
        <div className="contact-info">
          <p className="prose">
            Tell me what you run, on what hardware, and what it costs you today in latency or
            spend. I&apos;ll tell you what&apos;s realistic before either of us commits to
            anything.
          </p>
          <p className="prose prose--tight">
            Contract and part time work, remote. Short scoped engagements are fine, and often the
            best way to start.
          </p>
          <button type="button" className="copy" onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : DATA.email}</span>
          </button>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="mono-sm">
        © {new Date().getFullYear()} {DATA.name}
      </span>
      <div className="footer-links">
        <a href={DATA.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={DATA.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${DATA.email}`}>Email</a>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Experience />
      <Projects />
      <Research />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const pathname = usePathname();
  const isCaseStudies = pathname === CASE_STUDIES_PATH;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="shell">
      <Rail
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        pathname={pathname}
      />
      <div className="content">
        <main className="main">{isCaseStudies ? <CaseStudiesPage /> : <HomePage />}</main>
        <Footer />
      </div>
    </div>
  );
}
