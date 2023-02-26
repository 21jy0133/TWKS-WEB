import axios from 'axios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_API_ENDPOINT

class DataService {

  seachEmpIdData(empId, date) {

    let paramsList = []
    if (empId && empId.length>0)
      paramsList.push(['empId', empId])

    if (date && date.length>0)
      paramsList.push(['date', date])

    const params = new URLSearchParams(paramsList);
    return axios.get(API_URL + 'motionData/search/getByDateEmpId', { headers: authHeader(), params: params})
  }


}

export default new DataService();