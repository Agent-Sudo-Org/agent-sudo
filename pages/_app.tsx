import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';
import JsonLd, { faqItemsForSchema } from '@/components/JsonLd';

export default function App({ Component, pageProps }: AppProps) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://agent-sudo.vercel.app';
  const siteName = 'Agent-Sudo';
  const siteTitle =
    'Agent-Sudo - Adaptive High-Friction Guardrails for AI Agents';
  const siteDescription =
    'Agent-Sudo is a safety protocol for autonomous AI agents that prevents accidental production disasters through cognitive forcing functions. Requires Proof of Intent, not just Authorization.';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta
          name="keywords"
          content="AI agent safety, autonomous agents, HITL, human in the loop, agent guardrails, SUDO.md, AI safety protocol, cognitive friction, proof of intent, LLM safety, AI security"
        />
        <meta name="author" content="Agent-Sudo" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {siteUrl && <link rel="canonical" href={siteUrl} />}
        <meta property="og:type" content="website" />
        {siteUrl && <meta property="og:url" content={siteUrl} />}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta
          property="og:image"
          content={siteUrl ? `${siteUrl}/og.png` : '/og.png'}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        {siteUrl && <meta name="twitter:url" content={siteUrl} />}
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta
          name="twitter:image"
          content={siteUrl ? `${siteUrl}/og.png` : '/og.png'}
        />
        {siteUrl && (
          <meta name="twitter:domain" content={new URL(siteUrl).hostname} />
        )}
        <meta name="theme-color" content="#000000" />
      </Head>
      <JsonLd faqItems={faqItemsForSchema} />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
