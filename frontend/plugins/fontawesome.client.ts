import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCog,
  faShareAlt,
  faSignInAlt, faSignOutAlt, faTrashAlt, faUser, faUserEdit
} from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faSignInAlt,
  faFacebook,
  faLine,
  faDiscord,
  faSignOutAlt,
  faCog,
  faUser,
  faUserEdit,
  faShareAlt,
  faTrashAlt
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
