import React, { Component } from 'react'
import { Button, Jumbotron } from 'reactstrap'
import {Link} from 'react-router-dom'

export class Welcome extends Component {
  render() {
    return (
      <>
        <Jumbotron>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center text-center">
              <div className="font-weight-bold">
                <h3>Selamat Datang Peserta Didik Baru Sekolah Maju Tak Gentar</h3>
                <h1>Ingin Mendaftar ? Klik Daftar</h1>
                <Link to='/register'>
                  <Button color="info" className="mt-3">DAFTAR</Button>
                </Link>
              </div>
            </div>
          </div>
        </Jumbotron>
      </>
    )
  }
}

export default Welcome
