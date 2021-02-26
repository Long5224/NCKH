import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import "../assets/css/material-kit.css"
export default function Login() {
    return (
        <div>
        <div className="page-header header-filter" style={{backgroundImage: 'url("../bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
          <div className="container">
            <div className="row align-items-center">
                <div className="col-md-8" >
                </div>
                <div className="col-md-4 mt-4">
                    <LoginForm/>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}
