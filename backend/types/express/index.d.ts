declare module Express {
  interface Request {
    flash (key: string, data?: any): any
    user: import('../../models/UsersModel').UserDocument
  }
}
