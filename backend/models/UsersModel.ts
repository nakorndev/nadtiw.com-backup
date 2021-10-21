import { Schema as MongooseSchema, model, Document } from 'mongoose'

export const usernameValidate = {
  regex: /^(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_])$/,
  minlength: 3,
  maxlength: 20
}

export const maxLengths = {
  socialFacebook: 500,
  socialLine: 500,
  socialDiscord: 500,
  displayName: 100,
  location: 100,
  bio: 200
}

export interface UserDocument extends Document {
  username?: string
  oauth: {
    facebook?: string
    line?: string
    discord?: string
  }
  social?: {
    facebook?: string
    line?: string
    discord?: string
  }
  avatarUrl?: string
  displayName: string
  birthDate?: Date
  gender: 'male' | 'female' | 'none'
  location?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

const schema = new MongooseSchema({
  username: {
    type: String,
    validate: {
      validator: v => usernameValidate.regex.test(v),
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
      maxlength: maxLengths.socialFacebook
    },
    line: {
      type: String,
      maxlength: maxLengths.socialLine
    },
    discord: {
      type: String,
      maxlength: maxLengths.socialDiscord
    }
  },
  avatarUrl: {
    type: String,
    maxlength: 500
  },
  displayName: {
    type: String,
    required: true,
    maxlength: maxLengths.displayName
  },
  birthDate: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'none']
  },
  location: {
    type: String,
    maxlength: maxLengths.location
  },
  bio: {
    type: String,
    maxlength: maxLengths.bio
  }
}, { timestamps: true })

export default model('Users', schema)
