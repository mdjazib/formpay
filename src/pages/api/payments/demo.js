export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const isProd = process.env.NEXT_PUBLIC_PAYMENT_PROD === 'true'
  if (isProd) {
    return res.status(403).json({ error: 'Demo payments disabled in production' })
  }

  const { amount, currency = 'USD', description } = req.body

  // Simulate payment processing delay
  await new Promise(r => setTimeout(r, 800))

  const demoToken = `demo_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

  return res.status(200).json({
    success: true,
    transactionId: demoToken,
    amount,
    currency,
    description,
    message: 'Demo payment processed successfully',
    isDemo: true,
  })
}
