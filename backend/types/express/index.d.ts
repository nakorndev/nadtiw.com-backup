declare module Express {
  interface Request {
    flash (key: string, data?: any): any
    user: UserDocument
  }
}
