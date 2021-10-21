export default class ErrorBuilder {
  constructor (message: string, status: number = 500) {
    const err = new Error(message) as any
    err.status = status
    return err
  }
}
