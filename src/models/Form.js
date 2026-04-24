import mongoose from 'mongoose'

const FieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      'text', 'textarea', 'email', 'phone', 'number',
      'select', 'radio', 'checkbox', 'date', 'time',
      'file', 'heading', 'paragraph', 'divider',
      'rating', 'scale', 'matrix', 'payment',
    ],
  },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  helpText: { type: String, default: '' },
  required: { type: Boolean, default: false },
  options: [{ label: String, value: String }],
  validation: {
    min: Number,
    max: Number,
    minLength: Number,
    maxLength: Number,
    pattern: String,
  },
  settings: {
    amount: Number,
    currency: { type: String, default: 'USD' },
    paymentGateway: { type: String, enum: ['stripe', 'razorpay', 'demo'], default: 'demo' },
    rows: Number,
    columns: [String],
    maxRating: Number,
    allowMultiple: Boolean,
    acceptedTypes: [String],
    maxFileSize: Number,
  },
  style: {
    width: { type: String, default: 'full' },
    hidden: { type: Boolean, default: false },
  },
}, { _id: false })

const FormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Form title is required'],
    trim: true,
    maxlength: [200, 'Title too long'],
    default: 'Untitled Form',
  },
  description: {
    type: String,
    default: '',
    maxlength: [1000, 'Description too long'],
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  fields: [FieldSchema],
  settings: {
    isPublished: { type: Boolean, default: false },
    allowMultipleResponses: { type: Boolean, default: true },
    showProgressBar: { type: Boolean, default: false },
    shuffleFields: { type: Boolean, default: false },
    requireLogin: { type: Boolean, default: false },
    closeDate: Date,
    maxResponses: Number,
    redirectUrl: { type: String, default: '' },
    successMessage: { type: String, default: 'Thank you for your response!' },
    notifyEmail: { type: String, default: '' },
  },
  design: {
    theme: { type: String, default: 'clean' },
    primaryColor: { type: String, default: '#0F62FE' },
    backgroundColor: { type: String, default: '#FFFFFF' },
    fontFamily: { type: String, default: 'Inter' },
    coverImage: { type: String, default: '' },
    logo: { type: String, default: '' },
  },
  payment: {
    enabled: { type: Boolean, default: false },
    gateway: { type: String, enum: ['stripe', 'razorpay', 'demo', 'none'], default: 'none' },
    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    description: { type: String, default: '' },
  },
  responseCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  isTemplate: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
}, {
  timestamps: true,
})

FormSchema.pre('save', function (next) {
  if (!this.slug) {
    const base = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 50)
    this.slug = `${base}-${Math.random().toString(36).slice(2, 8)}`
  }
  next()
})

export default mongoose.models.Form || mongoose.model('Form', FormSchema)
