import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = obj => {
    const request = axios.post(baseUrl, obj)
    return request.then(response => response.data)
}
const update = (id, obj)=> {
    const request = axios.put(`${baseUrl}/${id}`, obj)
    return request.then(response => response.data)
}
const deleteObj = id => {
    //console.log(id)
    return axios.delete(`${baseUrl}/${id}`)
}
export default {getAll, create, update, deleteObj}