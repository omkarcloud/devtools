import _ from 'lodash'
import AxiosInstance from './axios'

async function trackAction(type, payload) {
  return AxiosInstance.post(`/actions/`, {type,  data:payload}, {
    silent: true,
  }).catch(console.error)
}

const Api = {
  trackAction,
}


export default Api
