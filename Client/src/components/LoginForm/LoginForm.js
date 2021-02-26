import React, { Component } from "react"

import "../../assets/css/material-kit.css"
export default class LoginForm extends Component {
    render(){
        return(
            <div className="card card-login">
                <form className="form" method action>
                    <div className="card-header card-header-primary text-center">
                        <h4 className="card-title">Đăng nhập</h4>               
                    </div>

                    <div className="mt-6">
                    <div className="card-body">
                    
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="material-icons">mail</i>
                            </span>
                        </div>
                        <input type="email" className="form-control-login" placeholder="Địa chỉ Email..." />
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="material-icons">lock_outline</i>
                            </span>
                        </div>
                        <input type="password" className="form-control-login" placeholder="Mật khẩu..." />
                    </div>

                    </div>
                <div className="mt-3 text-center">
                    <a href="#pablo" class="btn btn-primary btn-link btn-wd btn-lg">Đăng nhập</a>
                </div>         
                <p className="text-center">
                     Quên <a href="#forgot">mật khẩu?</a>
                </p>
                    </div>
                </form>
            </div>
        );
    }
}