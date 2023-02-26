import axios from 'axios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_API_ENDPOINT

class EmployeeService {

  getEmployees() {
    return axios.get(API_URL + 'employee', { headers: authHeader() })
  }
  getEmployeeById(id) {
    return axios.get(API_URL + 'employee/' + id + '?projection=employeeDetailedView', { headers: authHeader() })
  }

  patchEmployeeById(id, data) {
    return axios.patch(API_URL + 'employee/' + id, data, { headers: authHeader() })
  }

  deleteEmployeeById(id) {
    return axios.delete(API_URL + 'employee/' + id, { headers: authHeader() })
  }

  registEmployee(data) {
    return axios.post(API_URL + 'auth/register/', data, { headers: authHeader() })
  }

  getEmployeesByDept(deptCode) {
    return axios.get(API_URL + 'employee/search/findEmployeeByDepartment_deptCode?projection=employeeView&deptCode=' + deptCode, { headers: authHeader() })
  }

  seachEmployeesByIdOrName(id, name) {

    let paramsList = []
    if (id && id.length>0)
      paramsList.push(['empId', id])

    if (name && name.length>0)
      paramsList.push(['name', name])

    const params = new URLSearchParams(paramsList);
    return axios.get(API_URL + 'employee/search/findByEmpIdContainsOrNameContains?projection=employeeView', { headers: authHeader(), params: params})
  }

  idToResourse(id) {
    return API_URL + 'employee/' + id
  }


}

export default new EmployeeService();