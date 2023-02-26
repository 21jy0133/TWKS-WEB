import axios from 'axios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_API_ENDPOINT

class JobTitleService {

  getJobTitles() {
    return axios.get(API_URL + 'jobTitle', { headers: authHeader() })
  }

  idToResourse(id) {
    return API_URL + 'jobTitle/' + id
  }
}

export default new JobTitleService();