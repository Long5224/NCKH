import http from './httpLocal.common'
import authHeader from '../helper/auth-header';

function getAll(apiUrl) {
    return new Promise((resolve, reject) =>{
        http.get(apiUrl, { headers: authHeader() })
        .then(res =>{
            resolve(res);
        })
    })
    
}

function getById(apiUrl, id) {
    return new Promise((resolve, reject) =>{
        http.get(`${apiUrl}/${id}`, { headers: authHeader() })
        .then(res =>{
            resolve(res);
        })
    })
}

function getChildrenById(apiUrl, id, childrenUrl) {
    return new Promise((resolve, reject) =>{
        http.get(`${apiUrl}/${id}/${childrenUrl}`, { headers: authHeader() })
        .then(res =>{
            resolve(res);
        })
    })
}


function update(apiUrl, id, data) {
    return http.put(`${apiUrl}/${id}/`, data);
}

function updateForChildren(apiUrl, id, childUrl, data) {
    return http.put(`${apiUrl}/${id}/${childUrl}`, data);
}

export default {
    getAll,
    getById,
    getChildrenById,
    update,
    updateForChildren
  };