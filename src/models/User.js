import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [80, 'Name cannot exceed 80 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'business'],
    default: 'free',
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  paymentKeys: {
    stripe: {
      publishable: { type: String, default: '' },
      secret: { type: String, default: '' },
    },
    razorpay: {
      keyId: { type: String, default: '' },
      keySecret: { type: String, default: '' },
    },
  },
  formCount: { type: Number, default: 0 },
  responseCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

UserSchema.methods.toSafeObject = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.paymentKeys
  return obj
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
