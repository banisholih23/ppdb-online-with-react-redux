import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter, Table, Row } from 'reactstrap'
import Swal from 'sweetalert2'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Link } from 'react-router-dom'
import history from '../utils/history'
import EditUser from '../components/editUser'

import { connect } from 'react-redux'
import { getUser, deleteUser} from '../redux/actions/admin'

const handleLogout = () => {
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
    history.push('/login')
  } else {
    alert("Something's wrong")
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    console.log('ini props', props)
    this.checkToken = () => {
      if (!localStorage.getItem('token')) {
        alert('You must login first')
        props.history.push('/login')
      }
      else {
        props.history.push('/home')
      }
    }
    this.state = {
      data: [],
      isLoading: false,
      showLogout: false,
      alert: null
    }
  }

  fetchData = () => {
    this.setState({ isLoading: true })
    this.props.getUser().then((response) => {
      this.setState({ isLoading: false })
    })
  }

  toggleLogoutModal = () => {
    this.setState({
      showLogoutModal: !this.state.showLogoutModal
    })
  }

  deleteUser = async (id) => {
    this.props.deleteUser(id)
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Poof! delete success'
    })
    this.onRefresh()
    // this.fetchData()
  }

  onDelete = (id) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => this.deleteUser(id) && this.hideAlert()}
        onCancel={() => this.hideAlert()}
        focusCancelBtn
      >
        Delete this id {id}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  onRefresh = () => {
    this.props.getUser()
  }

  componentDidMount() {
    this.onRefresh()
    this.fetchData()
    this.checkToken()
  }

  render() {
    const { dataUser } = this.props.user
    const nama = this.props.user.dataUser
    console.log('data user', dataUser)
    console.log('data nama', nama)
    let editModalClose = () => this.setState({ editModalShow: false })
    const { 
      userid, usernama, usertanggallahir,
      userwarganegara,
      useralamat,
      useremail,
      userasalsmp,
      usernamaayah,
      usernamaibu,
      userpenghasilanorangtua,
      usernohp,
    } = this.state
    return (
      <>
        <div className="container">
          <div className="d-flex justify-content-end mt-3 mb-2">
            <div className="row">
              <div className="font-weight-bold text-center">
                <h3>Selamat Datang Admin</h3>
                <h3>List User PPDB Sekolah Maju Tak Gentar</h3>
                <Button color="danger" onClick={this.toggleLogoutModal}>Logout</Button>
              </div>
            </div>
          </div>
          <Row className="mt-5 no-gutters w-100 h-100">
            <div className="col-12">
              <EditUser
                show={this.state.editModalShow}
                onHide={editModalClose}
                refreshdata={() => this.fetchData()}
                userid={userid}
                usernama={usernama}
                usertanggallahir={usertanggallahir}
                userwarganegara={userwarganegara}
                useralamat={useralamat}
                useremail={useremail}
                usernohp={usernohp}
                userasalsmp={userasalsmp}
                usernamaayah={usernamaayah}
                usernamaibu={usernamaibu}
                userpenghasilanorangtua={userpenghasilanorangtua}
              />
              {this.state.isLoading &&
                <div className="d-flex justify-content-center align-items-center">
                  Loading...
              </div>
              }
              {!this.state.isLoading && (
                <Table bordered>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User Image</th>
                      <th>Nama</th>
                      <th>Tanggal lahir</th>
                      <th>Warga Negara</th>
                      <th>Alamat</th>
                      <th>Email</th>
                      <th>No Hp</th>
                      <th>Asal SMP</th>
                      <th>Nama Ayah</th>
                      <th>Nama Ibu</th>
                      <th>Penghasilan Ortu</th>
                      <th>Custom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUser.map((user, i) => (
                      <tr key={user.id.toString()}>
                        <td>{`${user.id}`}</td>
                        <td><img src={`${user.image}`} alt={`${user.id}`} /></td>
                        <td>{`${user.nama}`}</td>
                        <td>{`${user.tanggal_lahir}`}</td>
                        <td>{`${user.warga_negara}`}</td>
                        <td>{`${user.alamat}`}</td>
                        <td>{`${user.email}`}</td>
                        <td>{`${user.no_hp}`}</td>
                        <td>{`${user.asal_smp}`}</td>
                        <td>{`${user.nama_ayah}`}</td>
                        <td>{`${user.nama_ibu}`}</td>
                        <td>{`${user.penghasilan_orang_tua}`}</td>
                        <td align='center'>
                          <Button onClick={() => {
                            this.setState({
                              editModalShow: true,
                              userid: user.id,
                              usernama: user.nama,
                              usertanggallahir: user.tanggal_lahir,
                              userwarganegara: user.warga_negara,
                              useralamat: user.alamat,
                              useremail: user.email,
                              usernohp: user.no_hp,
                              userasalsmp: user.asal_smp,
                              usernamaayah: user.nama_ayah,
                              usernamaibu: user.nama_ibu,
                              userpenghasilanorangtua: user.penghasilan_orang_tua,
                            })
                          }} className="btn btn-warning ml-2 text-white">Edit</Button>
                          <Button onClick={() => { this.onDelete(user.id) }} size='sm' color='danger' className='mt-2 ml-2'>Delete</Button>
                        </td>
                        {this.state.alert}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Row>
        </div>
        <Modal isOpen={this.state.showLogoutModal}>
          <ModalBody className='h4'>Are you sure want to logout?</ModalBody>
          <ModalFooter>
            <Link to="/login">
              <Button color="danger" onClick={(e) => { handleLogout(e) }}>Yes</Button>
            </Link>
            <Button color='secondary' onClick={this.toggleLogoutModal}>No</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = { getUser, deleteUser }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
