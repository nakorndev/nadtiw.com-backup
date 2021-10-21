declare module Express {
  interface Request {
    flash (key: string, data?: any): void
    user: import('../../models/UsersModel').UserDocument
  }
}
