import CaseVideo from "./CaseVideo";
import AudioSamples from "./AudioSamples";
import ArtworkLayers from "./ArtworkLayers";
import ImageComparison from "./ImageComparison";
import MotionSample from "./MotionSample";
import SeriesViewer from "./SeriesViewer";
import { topicPath } from "../content/output-topics";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./still-gallery.css";

const dateFormat = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai", month: "short", day: "numeric",
});

export function SiteHeader({ topics, active }) {
  return <header className="site-header">
    <div className="shell">
      <a className="skip-link" href="#main">跳到内容</a>
      <nav className="topic-navigation" aria-label="产出分类">
        <a href="/" aria-current={active ? undefined : "page"}>首页</a>
        {topics.map(topic => <a key={topic.slug} href={topicPath(topic.slug)}
          aria-current={active === topic.slug ? "page" : undefined}>{topic.nav ?? topic.name}</a>)}
      </nav>
    </div>
  </header>;
}

function Evidence({ item, eager }) {
  if (item.artwork) return <ArtworkLayers artwork={item.artwork} />;
  if (item.series) return <SeriesViewer images={item.series} eager={eager} />;
  if (item.comparison) return <ImageComparison media={item.comparison} eager={eager} />;
  if (item.motion) return <MotionSample item={item} />;
  if (item.videos) return <div className="output-video-pair">
    {item.videos.map(({ stage, ...media }) => <div key={media.src}>
      <p>{stage}</p>
      <CaseVideo media={{ ...media, eager, sourceUrl: item.source.url }} />
    </div>)}
  </div>;
  if (item.images) return <div className={"image-output" + (item.images.length === 1 ? " image-output-single" : "")}>
    {item.images.map(({ label, ...media }) => <div key={media.src}>
      <img {...media} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />
      {label && <span>{label}</span>}
    </div>)}
  </div>;
  const sound = (item.audio || item.tracks) ? <AudioSamples audio={item.audio} tracks={item.tracks} text={item.audioText} /> : null;
  if (!item.video) return sound;
  const video = <CaseVideo media={{ ...item.video, eager, sourceUrl: item.source.url }} />;
  return sound ? <div className="output-picture-and-sound" data-playback-pair>{video}{sound}</div> : video;
}

export function OutputCard({ item, level = 3, eager = false }) {
  const Heading = level === 2 ? "h2" : "h3";
  const feature = item.feature || item.videos;
  const className = ["output-card", item.wide && "output-card-wide", feature && "output-card-feature"].filter(Boolean).join(" ");
  return <article className={className} id={item.id} aria-labelledby={item.id + "-title"}>
    <figure className="output-media">
      <Evidence item={item} eager={eager} />
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
    <div className="output-copy">
      <Heading id={item.id + "-title"}>{item.title}</Heading>
      <p className="output-summary">{item.summary}</p>
      {item.limit && <p className="output-limit">{item.limit}</p>}
      <div className="output-credit">
        <p className="output-meta">
          {item.role && <span className="output-role">{item.role}</span>}
          <span>{item.product}</span>
          {item.date && <time dateTime={item.date}>{item.dateLabel ?? dateFormat.format(new Date(item.date))}</time>}
        </p>
        <a className="output-source" href={item.source.url} target="_blank" rel="noopener noreferrer">
          {item.source.label}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  </article>;
}

function ShelfHeading({ topic }) {
  return <div className="section-heading">
      <h2 id={topic.slug + "-title"}>{topic.name}</h2>
      {topic.items.length > 1 && <a className="topic-entry" href={topicPath(topic.slug)} aria-label={"查看全部" + topic.name}>
        查看全部<ArrowRight size={16} aria-hidden="true" />
      </a>}
    </div>;
}

function TopicShelf({ topic, items = topic.homeItems, eager = false }) {
  return <section className="topic-section" aria-labelledby={topic.slug + "-title"}>
    <ShelfHeading topic={topic} />
    <div className="output-grid">
      {items.map(item => <OutputCard key={item.id} item={item} eager={eager} />)}
    </div>
  </section>;
}

function StillCard({ item, eager = false, sizes, heading: Heading = "h3" }) {
  const { images, title, product, source, role } = item;
  return <article className={item.wide ? "still-card still-card-wide" : "still-card"} id={item.id} aria-labelledby={item.id + "-title"}>
    <div className={"still-images" + (images.length > 1 ? " still-images-pair" : "")}>
      {images.map(({label, ...img}) => <a className="still-link" key={img.src} href={img.src} target="_blank" rel="noopener noreferrer"
        aria-label={img.alt + "，查看大图（新窗口）"}>
        <img {...img} sizes={sizes ?? (images.length > 1 ? "(max-width: 660px) 44vw, 23vw" : "(max-width: 660px) 92vw, (max-width: 1440px) 40vw, 570px")}
          loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} decoding="async" />
        {label && <span className="still-image-label">{label}</span>}
      </a>)}
    </div>
    <div className="still-copy">
      <Heading id={item.id + "-title"}>{title}</Heading>
      <p>{item.summary}</p>
      {item.limit && <p className="still-boundary">{item.limit}</p>}
      <div className="still-credit">
        {role && <span className="output-role">{role}</span>}
        <span>{product}</span>
        {item.date && <time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time>}
        <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight size={12} aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}

function ImageCollection({ items }) {
  const [lead, ...gallery] = items;
  return <section className="image-chapter">
    {lead && <div className="image-lead">
      <StillCard item={lead} eager heading="h2" sizes="(max-width: 660px) 94vw, 60vw" />
    </div>}
    <div className="image-examples">
      {gallery.map(item => item.images && !item.comparison
        ? <StillCard key={item.id} item={item} heading="h2" />
        : <OutputCard key={item.id} item={item} level={2} />)}
    </div>
  </section>;
}

export function HomeShowcase({ topics }) {
  const [images, video] = ["images", "video"].map(slug => topics.find(topic => topic.slug === slug));
  const [photograph, imageEdit, photoSeries] = images.homeItems;
  const [film, secondFilm] = video.homeItems;
  const continuation = [imageEdit, photoSeries, secondFilm].filter(Boolean);
  return <>
    <SiteHeader topics={topics} />
    <main className="shell home-showcase" id="main" tabIndex="-1">
      <h1 className="sr-only">AI 产出</h1>
      <div className="home-lead">
        <section aria-labelledby="images-title">
          <ShelfHeading topic={images} />
          {photograph && <StillCard item={photograph} eager sizes="(max-width: 660px) 94vw, (max-width: 1376px) 55vw, 740px" />}
        </section>
        <TopicShelf topic={video} items={film ? [film] : []} eager />
      </div>
      {continuation.length > 0 && <div className="home-continuation">
        {continuation.map(item => item.images && !item.comparison
          ? <StillCard key={item.id} item={item} sizes="(max-width: 660px) 46vw, 16vw" heading="h2" />
          : <OutputCard key={item.id} item={item} level={2} />)}
      </div>}
      <div className="other-directions">
        {topics.filter(topic => topic !== images && topic !== video)
          .map(topic => <TopicShelf key={topic.slug} topic={topic} />)}
      </div>
    </main>
  </>;
}

function TopicCases({ topic }) {
  if (!topic.sections) return <div className="output-grid">
    {topic.items.map((item, index) => <OutputCard key={item.id} item={item} level={2} eager={index === 0} />)}
  </div>;

  const sections = topic.sections.map(section => ({
    ...section, items: topic.items.filter(item => item.section === section.id),
  }));
  const sectionIds = new Set(topic.sections.map(section => section.id));
  const remaining = topic.items.filter(item => !sectionIds.has(item.section));
  if (remaining.length) sections.push({ id: "other-works", name: "其他作品", items: remaining });

  return sections.filter(section => section.items.length).map((section, index) =>
    <section id={section.id} aria-labelledby={section.id + "-title"} className="topic-chapter" key={section.id}>
      <h2 id={section.id + "-title"}>{section.name}</h2>
      <div className="output-grid">
        {section.items.map((item, rank) => <OutputCard key={item.id} item={item} eager={index === 0 && rank === 0} />)}
      </div>
    </section>
  );
}

export function TopicShowcase({ topics, topic }) {
  return <>
    <SiteHeader topics={topics} active={topic.slug} />
    <main className="shell topic-showcase" id="main" tabIndex="-1">
      <h1 className="page-title">{topic.name}</h1>
      {topic.slug === "images" ? <ImageCollection items={topic.items} /> : <TopicCases topic={topic} />}
    </main>
  </>;
}
