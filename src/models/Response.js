import mongoose from 'mongoose'

const ResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded', 'demo'],
      default: 'pending',
    },
    gateway: String,
    transactionId: String,
    amount: Number,
    currency: String,
    paidAt: Date,
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String,
    completionTime: Number,
  },
  isComplete: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
})

export default mongoose.models.Response || mongoose.model('Response', ResponseSchema)
