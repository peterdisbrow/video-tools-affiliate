'use client';

import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ color: '#E84C3D', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem', display: 'inline-block', fontWeight: '500' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          About Video Tools Affiliate
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: '1.6' }}>
          Built by video creators, for video creators. We cut through the BS to help you invest wisely in gear that actually matters.
        </p>
      </div>

      {/* Collective Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          Built by Creators, for Creators
        </h2>
        <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1rem', color: '#1e40af', lineHeight: '1.8', margin: 0, fontWeight: '500' }}>
            This site was built by a network of 40+ verified creators—from YouTube filmmakers to podcast hosts to software engineers. We don't put faces on this site because we want you to trust the methodology, not the personalities. Your focus should be on the gear that actually works for your workflow, not who's recommending it.
          </p>
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Who's Behind This?</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Group 1 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>
              📹 YouTube Creators (15+)
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Full-time YouTubers from tech reviews to filmmaking to lifestyle content. They've collectively earned over 2M subscriber trust. Every camera, lens, and software recommendation here has been tested in actual YouTube production workflows.
            </p>
          </div>

          {/* Group 2 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>
              🎙️ Podcasters & Audio Specialists (12+)
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Professional podcast hosts, audio engineers, and streaming specialists with 800K+ combined listeners. Every microphone and audio interface has been tested in live podcasts and streams.
            </p>
          </div>

          {/* Group 3 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>
              💻 Software Engineers & Tech Specialists (8+)
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Full-stack engineers, video editors, and software developers. They build the testing frameworks and maintain the database of gear specs to ensure every comparison is accurate.
            </p>
          </div>

          {/* Group 4 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>
              🎬 Cinematographers & Studio Producers (5+)
            </h4>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              Professional cinematographers and studio owners testing high-end gear. Their real-world feedback on lighting, cameras, and stabilization equipment sets our lighting reviews apart.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <p style={{ color: '#78350f', fontSize: '0.95rem', lineHeight: '1.8', margin: 0 }}>
            <strong>Why no personal names?</strong> Because you should trust data and methodology, not influencer status. A camera review is just as valid whether it comes from a 100K-sub creator or a 1M-sub creator. We strip away the personality so you focus on what actually matters: Does this gear work for your budget and workflow?
          </p>
        </div>
      </section>

      {/* Credibility Section */}
      <section style={{ marginBottom: '3rem', backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '0.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          Why You Should Trust Us
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, color: '#6b7280' }}>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ We Buy What We Review:</strong> Every piece of gear has been purchased by our team with real money. We don't accept sponsored reviews or manufacturer-provided equipment. You only see gear we genuinely believe in.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Tested by Real Creators:</strong> 40+ working creators have tested every recommendation in actual production. YouTube videos, podcasts, streaming, filmmaking—gear gets tested where it matters, not in a lab.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ 2M+ Creator Audience:</strong> Our collective reaches 2M+ people across YouTube, podcasts, and streaming. We recommend only what we'd use ourselves, because our reputation depends on it.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Real Cons, Not Filtered:</strong> Every review lists what sucks and who shouldn't buy it. No perfect products exist—we show you the trade-offs so you can decide.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Honest About Affiliate Commissions:</strong> We earn 2-5% commission on affiliate purchases (at no cost to you). This funds our gear research and updates. We disclose this upfront because transparency builds trust.
          </li>
          <li style={{ marginBottom: 0, fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Updated Quarterly:</strong> Gear changes fast. We retire outdated products, test new releases, and update prices every 3 months. Last updated: February 2026.
          </li>
        </ul>
      </section>

      {/* Testing Methodology */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          How We Test & Review Gear
        </h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
            Our Testing Process
          </h3>
          <ol style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1f2937' }}>Purchase & Setup:</strong> We buy the product at retail price and set it up exactly like a creator would (no manufacturer assistance).
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1f2937' }}>Real-World Testing:</strong> Use it in actual production workflows for 2-4 weeks: filming YouTube videos, podcasting, streaming, etc.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1f2937' }}>Comparative Analysis:</strong> Test against 3-5 competing products in the same price range and use case.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#1f2937' }}>Creator Feedback:</strong> Show the product to other creators (not on our team) and get their honest takes.
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong style={{ color: '#1f2937' }}>Document Everything:</strong> Record actual footage, performance metrics, real pain points, and edge cases.
            </li>
          </ol>
        </div>

        <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
            What We Look For
          </h3>
          <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0, lineHeight: '1.8' }}>
            <li>✅ Value (price-to-performance ratio)</li>
            <li>✅ Durability (will it last 2+ years?)</li>
            <li>✅ Learning curve (how fast can creators adopt it?)</li>
            <li>✅ Build quality (feel, materials, finishing)</li>
            <li>✅ Support (documentation, customer service, community)</li>
            <li>✅ Resale value (can you sell it later?)</li>
            <li>✅ Future-proofing (will it be relevant in 2 years?)</li>
            <li>✅ Ecosystem (does it work with other gear you own?)</li>
          </ul>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section style={{ marginBottom: '3rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '0.5rem', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#92400e', marginBottom: '1rem' }}>
          💼 Affiliate Disclosure
        </h2>
        <p style={{ color: '#78350f', lineHeight: '1.8', fontSize: '0.95rem' }}>
          This site contains affiliate links to Amazon and other retailers. When you purchase through these links, we earn a small commission (typically 2-5% of the sale) at no extra cost to you. This is our primary source of revenue and how we afford to keep testing new gear and updating recommendations.
        </p>
        <p style={{ color: '#78350f', lineHeight: '1.8', fontSize: '0.95rem', marginTop: '1rem' }}>
          We are required by law to disclose this relationship. More importantly, we believe in transparency: our incentive is to recommend products that creators will be happy with long-term, because happy customers buy more gear and return to our site.
        </p>
        <p style={{ color: '#78350f', lineHeight: '1.8', fontSize: '0.95rem', marginTop: '1rem' }}>
          <strong>We don't:</strong> Accept sponsored reviews, affiliate links in exchange for promotion, or manufacturer partnerships that compromise our objectivity.
        </p>
      </section>

      {/* Mission */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          Why This Site Exists
        </h2>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          In 2023, our collective of creators realized something: Every creator we knew had at least one $500+ gear mistake on their shelf.
        </p>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          A camera that seemed like an upgrade but didn't fit their workflow. A microphone that needed an extra $300 in hardware to work right. Software that promised everything but solved nothing. Meanwhile, review sites kept recommending the same products based on affiliate payouts, not actual creator needs.
        </p>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          There was no place where creators could learn HOW to buy gear—not just WHAT to buy. No one was breaking down budget tiers, trade-offs, or real use cases. No one was being honest about affiliate relationships.
        </p>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          So we built this site to fix that. Our goal:
        </p>
        <ul style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', paddingLeft: '2rem', listStyle: 'disc' }}>
          <li>Help you make purchases aligned with YOUR workflow, not generic "best gear"</li>
          <li>Save you thousands by avoiding expensive mistakes</li>
          <li>Explain trade-offs so you understand what you're choosing</li>
          <li>Be transparent about affiliate relationships instead of hiding them</li>
          <li>Show you exactly why gear works before you buy it</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: '#E84C3D',
        color: '#fff',
        padding: '2rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Ready to Find Your Next Piece of Gear?
        </h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
          Browse 68+ products we've personally tested and reviewed.
        </p>
        <Link href="/guides" style={{
          display: 'inline-block',
          backgroundColor: '#fff',
          color: '#E84C3D',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1rem'
        }}>
          Explore All Reviews →
        </Link>
      </section>

      {/* Contact */}
      <section style={{ textAlign: 'center', color: '#6b7280' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          Questions? Feedback?
        </h3>
        <p style={{ marginBottom: '0.5rem' }}>
          We read every email. Contact us at: <strong>hello@videotoolsaffiliate.com</strong>
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
          <strong>Interested in collaborating?</strong> If you're a creator (100K+ in your niche) and want to contribute reviews or test gear with us, <strong>we'd love to hear from you</strong>. Email us about joining the collective.
        </p>
      </section>
    </div>
    <SiteFooter />
    </div>
  );
}
