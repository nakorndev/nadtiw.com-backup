import { mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'

const uploads = resolve(__dirname, '../uploads')

if (!existsSync(uploads)) {
  mkdirSync(uploads)
}

const avatars = resolve(__dirname, '../uploads/avatars')

if (!existsSync(avatars)) {
  mkdirSync(avatars)
}
