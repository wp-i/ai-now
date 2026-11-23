import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { TopicShowcase } from "../../Showcase";
import { outputTopics, retiredOutputTopic, topicPath } from "../../../content/output-topics";
import { readOutputTopics } from "../../../lib/output-catalog";

export const dynamic = "force-dynamic";

type TopicPage = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: TopicPage): Promise<Metadata> {
  const { topic } = await params;
  const match = outputTopics.find(item => item.slug === topic);
  return match ? { title: match.name + " · AI 产出", description: match.description } : {};
}

export default async function TopicPage({ params }: TopicPage) {
  const { topic } = await params;
  const retired = retiredOutputTopic(topic);
  if (retired) permanentRedirect(topicPath(retired.slug) + "#" + retired.section);
  if (!outputTopics.some(item => item.slug === topic)) notFound();
  const topics = await readOutputTopics();
  const selected = topics.find(item => item.slug === topic);
  if (!selected) notFound();
  return <TopicShowcase topics={topics} topic={selected} />;
}
