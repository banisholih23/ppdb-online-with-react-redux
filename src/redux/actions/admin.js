import http from '../../helper/http'

const getUser = (param) => {
  const url = `http://localhost:5050/admin/all-user?${param}`
  return {
    type: 'GETUSER',
    payload: http().get(url)
  }
}

const postUser = (dataPost) => {
  const url = 'http://localhost:5050/user'
  return {
    type: 'POSTUSER',
    payload: http().post(url, dataPost)
  }
}

const patchUser = (id, dataUser) =>{
  const url = `http://localhost:5050/admin/all-user/${id}`
  return {
    type: 'PATCHUSER',
    payload: http().patch(url, dataUser)
    }
  }

const deleteUser = (id) => {
  const url = `http://localhost:5050/admin/all-user/${id}`
  return {
    type: 'DELETEUSER',
    payload: http().delete(url)
  }
}

export { getUser, deleteUser, postUser, patchUser }