import React, { Component } from 'react'
import { Jumbotron, Button, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap'
import swal from 'sweetalert2'

import { connect } from 'react-redux'
import { postUser } from '../redux/actions/admin'

class Register extends Component {
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
      file_: {}
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleImage = (e) => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]), file_: e.target.files[0] })
  }

  addUser = (e) => {
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

    this.props.postUser(userData).then((response) => {
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
      text: "Terimakasih sudah mendaftar!"
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center mt-5 content">
          <Jumbotron>
            <div className="container mb-3">
              <div className="d-flex justify-content-center align-items-center text-center">
                <div className="font-weight-bold">
                  <h3>Selamat Datang</h3>
                  <h3>Silahkan isi form dibawah ini</h3>
                </div>
              </div>
            </div>
            <Form onSubmit={this.addUser}>
              <FormGroup>
                <Label>Nama</Label>
                <Input type="text" name="nama" id="exampleName" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Tanggal Lahir</Label>
                <Input type="date" name="tanggal_lahir" id="exampleEmail" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Warga Negara</Label>
                <Input type="text" name="warga_negara" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Alamat</Label>
                <Input type="text" name="alamat" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>No HP</Label>
                <Input type="text" name="no_hp" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Asal SMP</Label>
                <Input name="asal_smp" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Nama Ayah</Label>
                <Input type="text" name="nama_ayah" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Nama Ibu</Label>
                <Input type="text" name="nama_ibu" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label>Penghasilan Orang Tua</Label>
                <Input name="penghasilan_orang_tua" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={2}>Upload Foto</Label>
                <Col sm={10}>
                  <Input type="file" onChange={this.handleImage} />
                  <FormText color="muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
                  </FormText>
                  <Button onClick={this.addUser} className="mt-3" color="success" type="submit">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </Jumbotron>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = { postUser }

export default connect(null, mapDispatchToProps)(Register)