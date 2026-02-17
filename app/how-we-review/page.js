'use client';

import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

export default function HowWeReview() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <SiteNav />
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ color: '#2563EB', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '1.5rem', display: 'inline-block', fontWeight: '500' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          How We Review Gear
        </h1>
        <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6' }}>
          Transparency about our testing methodology, criteria, and why you can trust our recommendations.
        </p>
      </div>

      {/* Testing Process */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          The Testing Process
        </h2>

        <div style={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '0.5rem', padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>1️⃣</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  We Buy It (With Our Money)
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  Every product on this site is purchased at retail price using our own funds. No manufacturer loans, no sponsorships, no free gear. This ensures we review it the same way you would: as an actual investment.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>2️⃣</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  We Use It in Real Workflows
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We test each product for 2-4 weeks in actual production environments: filming YouTube videos, podcasting, streaming, event coverage. Not in a lab, not with manufacturer support—just like you would use it.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>3️⃣</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  We Compare Against Alternatives
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We test 3-5 competing products in the same category and price range. This gives us context for what makes this product special or where it falls short versus alternatives.
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>4️⃣</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  We Get Feedback from Other Creators
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We share the product with other creators (not on our team) and ask for honest feedback. Do they like it? What frustrated them? Would they buy it again?
                </p>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>5️⃣</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  We Document Everything
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  We collect real footage, performance data, failure modes, and pain points. We note when something works in perfect conditions but fails in reality. We're honest about edge cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Evaluate */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          What We Actually Evaluate
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Value', desc: 'Price-to-performance ratio. Does it deliver value compared to cheaper alternatives? Is it worth the premium?' },
            { title: 'Durability', desc: 'Will it last 2-3+ years of regular use? How does build quality hold up? Are components replaceable?' },
            { title: 'Learning Curve', desc: 'How fast can a creator start using it productively? Is the UI/UX intuitive? How steep is the documentation?' },
            { title: 'Build Quality', desc: 'How does it feel? Materials, finishing, attention to detail. Does it feel cheap or premium?' },
            { title: 'Support', desc: 'Is there good documentation? Responsive customer service? Active community? Easy troubleshooting?' },
            { title: 'Resale Value', desc: 'If you sell it in 2 years, will you recover a reasonable amount of your investment?' },
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Don't Do */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          What We Don't Do
        </h2>

        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          color: '#7f1d1d'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>❌ Accept Sponsored Reviews:</strong> We don't review products if the manufacturer offers payment, free gear, or any incentive. Our recommendations are independent.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>❌ Accept Affiliate Payouts Beyond Standard Rates:</strong> We use standard affiliate programs. We don't accept higher commissions for better placement.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>❌ Review Products We Haven't Tested:</strong> Every product we recommend has been personally tested by our team. No exceptions.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>❌ Hide Our Biases:</strong> We're creators first. We have preferences. We tell you what they are and why.
            </li>
            <li>
              <strong>❌ Review Every Product:</strong> Many products don't make it onto this site because they failed our testing or didn't offer good value. We're selective.
            </li>
          </ul>
        </div>
      </section>

      {/* How We Pick Products */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          How We Decide What to Review
        </h2>

        <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          We start by looking at what tools creators actually talk about and use:
        </p>

        <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem', listStyle: 'disc', marginBottom: '1.5rem' }}>
          <li>YouTube comments from creators asking "is this worth it?"</li>
          <li>Reddit discussions in communities like r/videography, r/Twitch, r/podcasting</li>
          <li>Gear mentioned by popular creators in the space</li>
          <li>Products that solve real creator pain points</li>
          <li>Tools that represent best value at different price points</li>
        </ul>

        <p style={{ color: '#6b7280', lineHeight: '1.8' }}>
          Once we identify candidates, we test them. If they pass, we review them. If they don't, we don't—even if they're popular or would generate affiliate revenue.
        </p>
      </section>

      {/* Rating System */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          How We Rate Products
        </h2>

        <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          Our rating (1-10) reflects value for creators at that price point:
        </p>

        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#1f2937' }}>9-10 ⭐</strong>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
              Excellent value. Worth buying even at full price. This is a "just buy it" product.
            </p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#1f2937' }}>7-8 ⭐</strong>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
              Good value. Worth the investment if it fits your needs. Expect to be happy long-term.
            </p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#1f2937' }}>5-6 ⭐</strong>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
              Middle of the road. Good for specific use cases. Check the cons before buying.
            </p>
          </div>
          <div>
            <strong style={{ color: '#1f2937' }}>Below 5 ⭐</strong>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
              Not on this site. If it doesn't score 5+, it doesn't get reviewed.
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate & Transparency */}
      <section style={{ marginBottom: '2.5rem', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '0.5rem', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#92400e', marginBottom: '1rem' }}>
          How We Make Money (Transparency)
        </h2>

        <p style={{ color: '#78350f', lineHeight: '1.8', marginBottom: '1rem' }}>
          We earn affiliate commissions (typically 2-5%) when you purchase through our links. This is our primary revenue. Here's why we're open about it:
        </p>

        <ul style={{ color: '#78350f', lineHeight: '1.8', paddingLeft: '1.5rem', listStyle: 'disc' }}>
          <li><strong>It aligns our incentives with yours:</strong> We want you to buy products you'll love, so you come back and trust us. One-time affiliate income is worthless if you never return.</li>
          <li><strong>It funds our testing:</strong> We spend real money testing products. Affiliate revenue helps us afford 2-4 weeks of testing time per product.</li>
          <li><strong>It's industry standard:</strong> Every major review site (Wirecutter, Rtings, etc.) uses affiliate revenue. It's not unusual or shady—it's how professional reviews work.</li>
          <li><strong>You pay nothing extra:</strong> The price you see on Amazon is the same whether you click our link or go directly. The commission is built into Amazon's margin.</li>
        </ul>
      </section>

      {/* Updates */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
          How Often We Update
        </h2>

        <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong>Product Reviews:</strong> Updated quarterly (or immediately if major issues arise). We note the last update date on each review.
        </p>

        <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          <strong>New Products:</strong> Added every 2-3 weeks as new gear worthy of review hits the market.
        </p>

        <p style={{ color: '#6b7280', lineHeight: '1.8' }}>
          <strong>Retired Products:</strong> If a product becomes outdated or superseded, we remove it and recommend alternatives.
        </p>
      </section>

      {/* CTA */}
      <section style={{
        backgroundColor: '#2563EB',
        color: '#fff',
        padding: '2rem',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Questions About Our Process?
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Email us at <strong>hello@videotoolsaffiliate.com</strong> with any questions about how we test or review gear.
        </p>
        <Link href="/guides" style={{
          display: 'inline-block',
          backgroundColor: '#fff',
          color: '#2563EB',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Read the Reviews →
        </Link>
      </section>
    </div>
    <SiteFooter />
    </div>
  );
}
