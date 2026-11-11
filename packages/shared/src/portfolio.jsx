import React from 'react';
import {ArrowUpRight, Instagram, Mail, MessageCircle, ChevronDown} from 'lucide-react';
import {normalizeContent} from './data.js';
import './portfolio.css';
const safeExternal = (u) => {try {const v = new URL(u); return ['https:','http:'].includes(v.protocol)?v.href:'';} catch {return ''}};
const whatsappLink = (s,message='Hello, I would like to discuss a collaboration with The Bong Petuk.') => {const digits = (s || '').replace(/\D/g,'');return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : ''};

// Never render raw user-supplied iframe markup. Extract a supported YouTube ID and construct our own safe player URL.
export const youtubeId = (input) => {
 if (!input || typeof input !== 'string') return '';
 const raw = input.trim();
 const source = raw.match(/src=["']([^"']+)["']/i)?.[1] || raw;
 try {
  const url = new URL(source);
  const host = url.hostname.toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
  let id = '';
  if (host === 'youtu.be') id = url.pathname.split('/')[1];
  else if (['youtube.com','youtube-nocookie.com'].includes(host)) {
    id = url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/]+)/)?.[1] || '';
  }
  return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : '';
 } catch {return ''}
};
function HeroMedia({type, image, video, label}) {
 const [playing,setPlaying] = React.useState(false);
 const id = youtubeId(video);
 React.useEffect(()=>setPlaying(false),[id,type]);
 if (type === 'none') return null;
 if (type === 'youtube' && id) return <div className="bp-hero-media-inner bp-video">
  {playing ? <iframe title={`${label} YouTube video`} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> : <button type="button" className="bp-video-poster" onClick={()=>setPlaying(true)} aria-label="Play featured YouTube video"><img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="YouTube video preview"/><span className="bp-play-badge">▶</span></button>}
 </div>;
 if (image) return <div className="bp-hero-media-inner"><img src={image} alt={label} fetchPriority="high"/></div>;
 return <div className="bp-hero-media-inner bp-hero-empty" aria-hidden="true"><span>ADD YOUR FEATURED IMAGE OR VIDEO</span></div>;
}
function LinkedCard({url,className,children,label}){const href=safeExternal(url);return href?<a className={`${className} bp-clickable-card`} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>:<article className={className}>{children}</article>}

const Image = ({src,alt,className=''}) => src ? <img className={className} src={src} alt={alt} loading="lazy"/> : <div className={`bp-photo-placeholder ${className}`} aria-label={`${alt} image placeholder`}><span>THE BONG PETUK</span></div>;
const PhotoSection = ({item,index}) => <article className="bp-niche"><div className="bp-niche-photo"><Image src={item.image} alt={item.title}/></div><div className="bp-niche-caption"><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div></article>;
export function PortfolioView({content,preview=false}) {
  const c = normalizeContent(content); const t = c.theme;
  const variables = {'--bp-hover-accent': t.hoverAccent || t.accent, '--bp-hover-strength': (Number(t.hoverStrength)||5), '--bp-hover-speed': t.hoverSpeed === 'fast' ? '150ms' : t.hoverSpeed === 'slow' ? '550ms' : '300ms', '--bp-bg': t.background,'--bp-surface':t.surface,'--bp-ink':t.text,'--bp-muted':t.muted,'--bp-accent':t.accent,'--bp-radius':`${t.radius || 0}px`,'--bp-space':t.spacing || 1,'--bp-font': t.font === 'Georgia' ? 'Georgia, serif' : t.font === 'Arial' ? 'Arial, sans-serif' : 'Inter, system-ui, sans-serif'};
  const nav = c.sections.filter(s=>s.visible && s.id!=='hero' && s.id!=='contact');
  const showSection=(id) => {
    switch(id) {
      case 'hero': return <section className={`bp-hero bp-desktop-${c.brand.heroDesktopPosition||'right'} bp-mobile-${c.brand.heroMobilePosition||'below'} ${c.brand.heroDesktopType==='none'?'bp-hero-no-media':''} ${c.brand.heroMobileType==='none'?'bp-mobile-no-media':''}`} id="home" key={id}><div className={`bp-hero-media bp-hero-desktop-media ${c.brand.heroDesktopType==='youtube'?'bp-media-youtube':''}`}><HeroMedia type={c.brand.heroDesktopType||'image'} image={c.brand.heroImage} video={c.brand.heroDesktopVideo} label="Featured desktop image"/></div><div className={`bp-hero-media bp-hero-mobile-media ${c.brand.heroMobileType==='youtube'?'bp-media-youtube':''}`}><HeroMedia type={c.brand.heroMobileType||'image'} image={c.brand.heroMobileImage||c.brand.heroImage} video={c.brand.heroMobileVideo||c.brand.heroDesktopVideo} label="Featured mobile image"/></div><div className="bp-hero-content"><span className="bp-kicker">CREATOR · STORYTELLER · UGC</span><h1>{c.brand.tagline}</h1><p>{c.brand.summary}</p><div className="bp-actions"><a className="bp-button" href="#reels">Explore my work <ArrowUpRight size={17}/></a><a className="bp-text-link" href="#contact">Let's collaborate <ArrowUpRight size={16}/></a></div></div><a href="#about" className="bp-scroll">Discover more <ChevronDown size={16}/></a></section>;
      case 'about': return <section className="bp-section bp-about" id="about" key={id}><div className="bp-about-image"><Image src={c.brand.profileImage} alt="Portrait of the creator"/></div><div className="bp-about-copy"><span className="bp-kicker">{c.about.eyebrow}</span><h2>{c.about.heading}</h2><p>{c.about.body}</p><span className="bp-signature">{c.brand.byline}</span></div></section>;
      case 'metrics': {const list = c.metrics.filter(m=>String(m.value || '').trim());return list.length ? <section className="bp-section bp-metrics" id="metrics" key={id}><div className="bp-section-heading"><span className="bp-kicker">SOCIAL IMPACT</span><h2>Stories with reach.</h2></div><div className="bp-stat-grid">{list.map(m=><article key={m.id} className="bp-stat"><strong>{m.value}</strong><span>{m.label}</span>{m.period && <small>{m.period}</small>}</article>)}</div></section> : null;}
      case 'niches': return <section className="bp-section" id="niches" key={id}><div className="bp-section-heading"><span className="bp-kicker">WHAT I CREATE</span><h2>Different worlds. One creative voice.</h2></div><div className="bp-niche-grid">{c.niches.map((n,i)=><PhotoSection key={n.id} item={n} index={i}/>)}</div></section>;
      case 'collaborations': return c.collaborations.length ? <section className="bp-section" id="collaborations" key={id}><div className="bp-section-heading"><span className="bp-kicker">SELECTED COLLABORATIONS</span><h2>Stories we've created together.</h2></div><div className="bp-collab-grid">{c.collaborations.map(b=><LinkedCard className="bp-collab" key={b.id} url={b.url} label={`Open campaign for ${b.name}`}><div className="bp-collab-photo"><Image src={b.image || b.logo} alt={b.name}/></div><div><span className="bp-kicker">{b.category || 'BRAND COLLABORATION'}</span><h3>{b.name}</h3><p>{b.description}</p>{safeExternal(b.url)&&<span className="bp-card-action">View campaign <ArrowUpRight size={16}/></span>}</div></LinkedCard>)}</div></section>:null;
            case 'reels': return c.reels.length ? <section className="bp-section" id="reels" key={id}><div className="bp-section-heading"><span className="bp-kicker">FEATURED WORK</span><h2>Stories worth watching.</h2></div><div className="bp-reels-grid">{c.reels.map(r=><LinkedCard className="bp-reel" key={r.id} url={r.url} label={`Watch ${r.title}`}><div className="bp-reel-image"><Image src={r.image} alt={r.title}/></div><div><span className="bp-kicker">{r.category || 'CREATIVE WORK'}</span><h3>{r.title}</h3>{r.description&&<p>{r.description}</p>}{safeExternal(r.url)&&<span className="bp-card-action">Open featured work <ArrowUpRight size={16}/></span>}</div></LinkedCard>)}</div></section>:null;
            case 'services': return <section className="bp-section" id="services" key={id}><div className="bp-section-heading"><span className="bp-kicker">WORK WITH ME</span><h2>Your vision. My lens.</h2></div><div className="bp-services-grid">{c.services.map((s,i)=><article key={s.id} className="bp-service"><span>0{i+1}</span><h3>{s.title}</h3><p>{s.description}</p></article>)}</div></section>;
      case 'contact': return <section className="bp-section bp-contact" id="contact" key={id}><span className="bp-kicker">LET'S COLLABORATE</span><h2>{c.contact.headline}</h2><p>{c.contact.message}</p><div className="bp-contact-actions">{c.contact.email && <a href={`mailto:${c.contact.email}`} className="bp-button"><Mail size={17}/> Email me</a>}{whatsappLink(c.contact.whatsapp,c.contact.whatsappMessage) && <a className="bp-button bp-button-secondary" target="_blank" rel="noreferrer" href={whatsappLink(c.contact.whatsapp,c.contact.whatsappMessage)}><MessageCircle size={17}/> WhatsApp</a>}{safeExternal(c.contact.instagram) && <a className="bp-button bp-button-secondary" target="_blank" rel="noreferrer" href={safeExternal(c.contact.instagram)}><Instagram size={17}/> Instagram</a>}</div></section>;
      default: return null;
    }
  };
  return <div className={`bp-root bp-hover-${['lift','zoom','glow','tilt','none'].includes(t.hoverStyle)?t.hoverStyle:'lift'} ${preview?'bp-is-preview':''}`} style={variables}>
    <header className="bp-header"><a className="bp-wordmark" href="#home">{c.brand.logo ? <img src={c.brand.logo} alt={c.brand.name}/> : <><b>{c.brand.name}</b><small>{c.brand.byline}</small></>}</a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#niches">Expertise</a><a href="#reels">Work</a><a href="#collaborations">Brands</a></nav><a className="bp-header-contact" href="#contact">Let's talk <ArrowUpRight size={15}/></a></header>
    <main>{c.sections.filter(s=>s.visible).map(s=>showSection(s.id))}</main>
    {c.contact.floatingWhatsapp !== false && whatsappLink(c.contact.whatsapp,c.contact.whatsappMessage) && <a className="bp-whatsapp-float" href={whatsappLink(c.contact.whatsapp,c.contact.whatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={23}/></a>}
    <footer className="bp-footer"><div><b>{c.brand.name}</b><span>{c.brand.location}</span></div><a href={safeExternal(c.contact.instagram) || '#home'} target="_blank" rel="noreferrer"><Instagram size={18}/> Instagram</a><small>© {new Date().getFullYear()} The Bong Petuk</small></footer>
  </div>;
}
