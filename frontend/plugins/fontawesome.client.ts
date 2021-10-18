import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faLine
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faSignInAlt,
  faFacebook,
  faLine
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
