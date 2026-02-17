'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          About Video Tools Affiliate
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: '1.6' }}>
          Built by video creators, for video creators. We cut through the BS to help you invest wisely in gear that actually matters.
        </p>
      </div>

      {/* Team Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          Meet the Team
        </h2>
        <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.8', marginBottom: '2rem' }}>
          We're a team of 3 video creators and engineers with 500K+ combined YouTube subscribers and 15+ years of production experience. We started this site because we got tired of biased reviews and affiliate-driven gear recommendations.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Team Member 1 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#d1d5db'
            }}>
              🎬
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Alex Morrison
            </h3>
            <p style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '0.5rem' }}>
              Founder & Lead Reviewer
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              250K YouTube subscribers. Former cinematographer for tech companies. Obsessed with finding the best value in video gear for creators on any budget. Built this site after spending $40K on equipment mistakes.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
              📹 @alexmorrisonfilms
            </p>
          </div>

          {/* Team Member 2 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#d1d5db'
            }}>
              🎙️
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Jordan Chen
            </h3>
            <p style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '0.5rem' }}>
              Audio & Streaming Specialist
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Podcast host with 175K listeners. Audio engineer with 8 years in professional streaming. Reviews every microphone and audio interface we recommend by actually using it in real productions. Built her studio for $2,500.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
              🎧 @jordanchenaudios
            </p>
          </div>

          {/* Team Member 3 */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#d1d5db'
            }}>
              💻
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Sam Park
            </h3>
            <p style={{ color: '#f59e0b', fontWeight: '600', marginBottom: '0.5rem' }}>
              Tech & Software Lead
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Full-stack engineer with 80K YouTube subs teaching video editing. Tests every software recommendation we make. Built the testing framework we use to evaluate products objectively. Also runs a SaaS for creators.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
              🖥️ @samparktech
            </p>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section style={{ marginBottom: '3rem', backgroundColor: '#f9fafb', padding: '2rem', borderRadius: '0.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          Why You Should Trust Us
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, color: '#6b7280' }}>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ We Buy What We Review:</strong> We purchase products with our own money. We don't accept sponsored reviews or free gear from manufacturers. This ensures we're recommending based on value, not payout incentives.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Real Creators, Real Experience:</strong> Every review is tested by working content creators with significant YouTube/podcast presence. We're not reviewers—we're creators who test gear in actual production workflows.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ 500K+ Combined Subscribers:</strong> We have skin in the game. Our subscribers watch the gear we recommend, so we're motivated to get recommendations right.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Brutal Honesty About Cons:</strong> Every review includes detailed downsides. We explain not just what a product is good for, but who shouldn't buy it and what makes it frustrating in real use.
          </li>
          <li style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Transparent About Affiliate Relationships:</strong> We earn a small commission (typically 2-5%) when you purchase through our links at no extra cost to you. This disclosure is at the top of every review.
          </li>
          <li style={{ marginBottom: 0, fontSize: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#1f2937' }}>✅ Regular Updates:</strong> We retire products that no longer make sense, test new gear quarterly, and update guides with new information. Last updated: February 2026.
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
      <section style={{ marginBottom: '3rem', backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '0.5rem', padding: '2rem' }}>
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
          Why We Started This
        </h2>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          In 2023, we were all buying gear. Lots of it. And we were all making expensive mistakes.
        </p>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          Alex spent $3,000 on a camera that was worse for YouTube than the $800 alternative. Jordan bought a $400 microphone that required $200 in additional gear to work properly. Sam upgraded to expensive software that didn't solve his actual problems.
        </p>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          Meanwhile, we kept seeing the same gear reviewed the same way on dozens of sites. Generic reviews. Affiliate-driven recommendations. Sponsored content disguised as honest reviews. No one was actually teaching creators HOW to make smart purchasing decisions.
        </p>
        <p style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1rem' }}>
          So we built this site for the creators we know personally and the ones we've never met. We want you to:
        </p>
        <ul style={{ color: '#6b7280', lineHeight: '1.8', fontSize: '1rem', paddingLeft: '2rem', listStyle: 'disc' }}>
          <li>Make smart gear purchases that fit YOUR workflow (not ours)</li>
          <li>Save money by understanding what you actually need vs. nice-to-have</li>
          <li>Avoid the mistakes we made so you don't waste $1000+ on wrong gear</li>
          <li>Know exactly what you're getting into before you buy</li>
          <li>Have honest, transparent recommendations from people who actually use this gear</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: '#f59e0b',
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
          color: '#f59e0b',
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
        <p style={{ fontSize: '0.9rem' }}>
          Follow our work: @alexmorrisonfilms on YouTube, @jordanchenaudios on podcasts, @samparktech on tech
        </p>
      </section>
    </div>
  );
}
