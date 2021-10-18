import { Schema as MongooseSchema, model, Document } from 'mongoose'
import validator from 'validator'

export const usernameRegex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/

export interface UserDocument extends Document {
  username?: string
  oauth: {
    facebook?: string
    line?: string
    discord?: string
  }
  social?: {
    facebook?: string
  }
  email?: string
  avatarUrl?: string
  fullName?: string
  birthDate?: Date
  gender: 'male' | 'female' | 'none'
  location?: string
  createdAt: Date
  updatedAt: Date
}

const schema = new MongooseSchema({
  username: {
    type: String,
    validate: {
      validator: v => usernameRegex.test(v),
      message: 'รูปแบบชื่อผู้ใช้งานไม่ถูกต้อง'
    }
  },
  oauth: {
    facebook: String,
    line: String,
    discord: String
  },
  social: {
    facebook: {
      type: String,
      maxlength: 500
    },
    line: {
      type: String,
      maxlength: 500
    },
    discord: {
      type: String,
      maxlength: 500
    }
  },
  email: {
    type: String,
    maxlength: 200,
    validate: {
      validator: validator.isEmail,
      message: 'ที่อยู่อีเมลไม่ถูกต้อง'
    }
  },
  avatarUrl: {
    type: String,
    maxlength: 500
  },
  fullName: {
    type: String,
    maxlength: 200
  },
  birthDate: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'none']
  },
  location: {
    type: String,
    maxlength: 200
  }
}, { timestamps: true })

export default model('Users', schema)
