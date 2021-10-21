import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAddressCard,
  faAngleLeft,
  faAngleRight,
  faAt,
  faCalendarDay,
  faCog,
  faExclamationCircle,
  faGenderless,
  faMapMarkerAlt,
  faMars,
  faShareAlt,
  faSignInAlt, faSignOutAlt, faTrashAlt, faUser, faUserEdit, faVenus
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
  faTrashAlt,
  faAt,
  faAddressCard,
  faAngleLeft,
  faAngleRight,
  faCalendarDay,
  faMapMarkerAlt,
  faExclamationCircle,
  faMars,
  faVenus,
  faGenderless
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
