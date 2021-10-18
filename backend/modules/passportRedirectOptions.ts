export default {
  successRedirect: process.env.FRONTEND_URL + '/?message=auth_ok',
  failureRedirect: process.env.FRONTEND_URL + '/?message=auth_fail'
}
