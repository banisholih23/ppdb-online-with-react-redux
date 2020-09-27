import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { patchUser, getUser } from '../redux/actions/admin'
import swal from 'sweetalert2'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nama: '',
      tanggal_lahir: '',
      warga_negara: '',
      alamat: '',
      email: '',
      no_hp: '',
      asal_smp: '',
      nama_ayah: '',
      nama_ibu: '',
      penghasilan_orang_tua: '',
      image: '',
      file: [],
      file_: {},
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleImage = (e) => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]), file_: e.target.files[0] })
  }

  fetchData = () => {
    this.setState({ isLoading: true })
    this.props.getUser().then((response) => {
      this.setState({ isLoading: false })
    })
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  patchUser = (e) => {
    e.preventDefault()
    if (this.state.file_.size > 0) {
      if (this.state.file_.size >= 1240000 || this.state.file_.type.split('/')[0] !== 'image') {
        swal.fire('Failed', 'Max file size is 1240KB and file type just image', 'error')
        return;
      }
    }

    this.setState({ isLoading: true })
    const userData = new FormData()
    if (this.state.file_.size > 0) {
      userData.append('image', this.state.file_)
    }
    userData.set('nama', this.state.nama)
    userData.set('tanggal_lahir', this.state.tanggal_lahir)
    userData.set('warga_negara', this.state.warga_negara)
    userData.set('alamat', this.state.alamat)
    userData.set('email', this.state.email)
    userData.set('no_hp', this.state.no_hp)
    userData.set('asal_smp', this.state.asal_smp)
    userData.set('nama_ayah', this.state.nama_ayah)
    userData.set('nama_ibu', this.state.nama_ibu)
    userData.set('penghasilan_orang_tua', this.state.penghasilan_orang_tua)

    this.props.patchUser(`${this.props.userid}`, userData).then((response) => {
      console.log(response)
    })
      .catch(function (error) {
        console.log(error.response);
        swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: "Something's wrong, I can feel it"
        })
      })
    swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Good! Update successfully"
    })
    this.fetchData()
    this.props.onHide()
  }

  componentDidMount(){
    this.fetchData()
  }
  render(){
    return(
      <>
        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Author
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="contaniner">
                <Form onSubmit={ this.patchUser}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control 
                        name="id" 
                        readOnly 
                        onChange={this.handleChange} 
                        type="text" placeholder="ID Author" 
                        defaultValue={this.props.userid}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        name="nama" 
                        onChange={this.handleChange} 
                        type="text" placeholder="Name Author" 
                        defaultValue={this.props.usernama}/>
                    <Form.Text className="text-muted">
                    Please text mode
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control 
                        name="tanggal_lahir" 
                        onChange={this.handleChange} 
                        type="date" placeholder="Description" 
                        defaultValue={this.props.usertanggallahir}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Warga Negara</Form.Label>
                    <Form.Control 
                        name="warga_negara" 
                        onChange={this.handleChange} 
                        type="text" defaultValue={this.props.userwarganegara}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control 
                        name="alamat" 
                        onChange={this.handleChange} 
                        defaultValue={this.props.userwarganegara}
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        name="email" 
                        onChange={this.handleChange}
                        defaultValue={this.props.useremail}
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>No Hp</Form.Label>
                    <Form.Control 
                        name="no_hp" 
                        onChange={this.handleChange}
                        defaultValue={this.props.usernohp}  
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Asal SMP</Form.Label>
                    <Form.Control 
                        name="asal_smp" 
                        onChange={this.handleChange}
                        defaultValue={this.props.userasalsmp}
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nama Ayah</Form.Label>
                    <Form.Control 
                        name="nama_ayah" 
                        onChange={this.handleChange}
                        defaultValue={this.props.usernamaayah}  
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nama Ibu</Form.Label>
                    <Form.Control 
                        name="nama_ibu" 
                        onChange={this.handleChange}
                        defaultValue={this.props.usernamaibu}  
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Pengahsilan</Form.Label>
                    <Form.Control 
                        name="penghasilan_orang_tua" 
                        onChange={this.handleChange}
                        defaultValue={this.props.userpenghasilanorangtua}
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                        name="penghasilan_orang_tua" 
                        onChange={this.handleImage}
                        type="file"
                        />
                </Form.Group>
                <Button onClick={this.patchUser} variant="primary" type="submit">
                    Update
                </Button>
                </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button varian="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
      </>
    )
  }
}

const mapDispatchToProps = { patchUser, getUser }

export default connect(null, mapDispatchToProps)(EditUser)