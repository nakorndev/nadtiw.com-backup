import { Schema as MongooseSchema, model, Document } from 'mongoose'

export interface UserDocument extends Document {
  discordId: string
  email: string
  displayName: string
  avatar?: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

const schema = new MongooseSchema({
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  avatar: String,
  avatarUrl: String
}, { timestamps: true })

export default model('Users', schema)
