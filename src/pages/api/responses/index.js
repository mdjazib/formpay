import connectDB from '../../../lib/mongodb'
import Form from '../../../models/Form'
import Response from '../../../models/Response'
import { requireAuth } from '../../../lib/auth'

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'POST') {
    const { formId, answers, paymentToken } = req.body

    if (!formId || !answers) {
      return res.status(400).json({ error: 'formId and answers are required' })
    }

    const form = await Form.findById(formId)
    if (!form) return res.status(404).json({ error: 'Form not found' })
    if (!form.settings.isPublished) return res.status(403).json({ error: 'Form is not accepting responses' })

    const paymentStatus = form.payment.enabled
      ? paymentToken ? 'completed' : 'pending'
      : 'demo'

    const response = await Response.create({
      formId,
      answers: new Map(Object.entries(answers)),
      payment: {
        status: paymentStatus,
        gateway: form.payment.gateway,
        amount: form.payment.amount,
        currency: form.payment.currency,
        transactionId: paymentToken || null,
        paidAt: paymentToken ? new Date() : null,
      },
      metadata: {
        userAgent: req.headers['user-agent'],
        ipAddress: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      },
      isComplete: true,
    })

    await Form.findByIdAndUpdate(formId, { $inc: { responseCount: 1 } })

    return res.status(201).json({ response, redirectUrl: form.settings.redirectUrl, successMessage: form.settings.successMessage })
  }

  if (req.method === 'GET') {
    const decoded = await requireAuth(req, res)
    if (!decoded) return

    const { formId, page = 1, limit = 50 } = req.query
    if (!formId) return res.status(400).json({ error: 'formId required' })

    const form = await Form.findOne({ _id: formId, userId: decoded.userId })
    if (!form) return res.status(404).json({ error: 'Form not found or access denied' })

    const total = await Response.countDocuments({ formId })
    const responses = await Response.find({ formId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    return res.status(200).json({ responses, total })
  }

  return res.status(405).end()
}
