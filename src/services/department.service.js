import axios from 'axios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_API_ENDPOINT

class DepartmentService {

  getDepartments() {
    return axios.get(API_URL + 'department', { headers: authHeader() })
  }

  idToResourse(id) {
    return API_URL + 'department/' + id
  }
}

export default new DepartmentService();