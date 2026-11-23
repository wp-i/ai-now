import { HomeShowcase } from "./Showcase";
import { readHomeTopics } from "../lib/output-catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  return <HomeShowcase topics={await readHomeTopics()} />;
}
