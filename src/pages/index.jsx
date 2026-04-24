import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/landing.module.scss'

const features = [
  {
    title: 'Drag & drop builder',
    desc: '15+ field types. Build any form in minutes without writing a single line of code.',
    icon: '#0F62FE',
    emoji: '⚡',
  },
  {
    title: 'Integrated payments',
    desc: 'Stripe, Razorpay, and more. Collect payments right inside your form, seamlessly.',
    icon: '#24A148',
    emoji: '💳',
  },
  {
    title: 'Demo mode',
    desc: 'Test your entire flow including payments before going live. No surprises.',
    icon: '#B07D00',
    emoji: '🧪',
  },
  {
    title: 'Real-time responses',
    desc: 'Every submission tracked instantly. View, filter, and export your data easily.',
    icon: '#0043CE',
    emoji: '📊',
  },
  {
    title: 'Conditional logic',
    desc: 'Show or hide fields based on previous answers. Make forms feel intelligent.',
    icon: '#DA1E28',
    emoji: '🧠',
  },
  {
    title: 'Custom branding',
    desc: 'Match your brand. Custom colors, logos, and thank-you messages.',
    icon: '#6929C4',
    emoji: '🎨',
  },
]

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>PaidForm — Build forms that get paid</title>
      </Head>
      <div className={styles.page}>
        <nav className={styles.nav}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.logo}>
              <span className={styles.mark}>PF</span>
              <span className={styles.name}>Paid<span>Form</span></span>
            </Link>
            <div className={styles.navRight}>
              <Link href="/auth/login">
                <button className="btn btn-ghost btn-sm">Sign in</button>
              </Link>
              <Link href="/auth/register">
                <button className="btn btn-primary btn-sm">Get started free</button>
              </Link>
            </div>
          </div>
        </nav>

        <section style={{ borderBottom: '1px solid #E0E0E0' }}>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.kicker}>Advanced form builder</div>
              <h1>Build forms that actually get paid.</h1>
              <p>
                PaidForm combines a powerful form builder with integrated payments.
                Create, publish, and collect — all in one place.
              </p>
              <div className={styles.heroCta}>
                <Link href="/auth/register">
                  <button className="btn btn-primary btn-lg">Start building free</button>
                </Link>
                <Link href="/auth/login">
                  <button className="btn btn-secondary btn-lg">Sign in</button>
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.mockup}>
                <div className={styles.mockHeader}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.url}>paidform.io/f/event-registration</span>
                </div>
                <div className={styles.mockBody}>
                  <div className={styles.formTitle}>Tech Conference 2026</div>
                  <div className={styles.mockField}>
                    <div className={styles.label}>Full name *</div>
                    <div className={styles.input} />
                  </div>
                  <div className={styles.mockField}>
                    <div className={styles.label}>Email address *</div>
                    <div className={styles.input} />
                  </div>
                  <div className={styles.mockField}>
                    <div className={styles.label}>Ticket type</div>
                    <div className={styles.input} />
                  </div>
                  <div className={styles.payBlock}>
                    <div>
                      <div className={styles.payLeft}>Registration fee</div>
                      <div className={styles.payAmount}>$49.00</div>
                    </div>
                    <div className={styles.payBtn}>Pay now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featuresInner}>
            <div className={styles.featuresHead}>
              <div className={styles.tag}>Everything you need</div>
              <h2>Forms that work harder</h2>
            </div>
            <div className={styles.featuresGrid}>
              {features.map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <div className={styles.icon} style={{ background: f.icon }}>
                    <span style={{ fontSize: '1.25rem' }}>{f.emoji}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2>Ready to start collecting?</h2>
            <p>Join creators who use PaidForm to build smarter forms and get paid on every submission.</p>
            <div className={styles.ctaBtns}>
              <Link href="/auth/register">
                <button className="btn btn-primary btn-lg">Create free account</button>
              </Link>
            </div>
          </div>
        </section>

        <footer className={styles.footer} style={{ borderTop: '1px solid #E0E0E0' }}>
          <p>© {new Date().getFullYear()} PaidForm. All rights reserved.</p>
          <div className={styles.footLinks}>
            <Link href="/auth/login">Sign in</Link>
            <Link href="/auth/register">Register</Link>
          </div>
        </footer>
      </div>
    </>
  )
}
