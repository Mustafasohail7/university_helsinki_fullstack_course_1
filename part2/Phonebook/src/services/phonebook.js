import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (personObject) => {
    const request = axios.post(baseUrl,personObject)
    return request.then(response => response.data)
}

const update = async (id,personObject) => {
    const request = axios.put(`${baseUrl}/${id}`,personObject)
    return request.then(response => response.data)
} 

const eliminate = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
} 

export { getAll, create, update, eliminate }