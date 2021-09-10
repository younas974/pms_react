import React, {FC, FormEvent, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {setAlert} from '../store/actions/alertAction'
import {getWeather, setLoading } from '../store/actions/weatherAction'
import {signin} from '../store/actions/user.actions'
import { useHistory } from 'react-router-dom'


interface SearchProps{
    title: string,

}

const SignIn : FC<any> =({title})=>{

	const history = useHistory()
    const dispatch= useDispatch();
    const [city, setCity]=useState('');
	const [login, setLogin]= useState({
		username:'',
		password: ''
	})
    
	const {username,password}=login
    const changeHandler=(e: FormEvent<HTMLInputElement>)=>{
        setCity(e.currentTarget.value)
    }

    
	const handleChange= (data:any) =>(e:any)=>{
      
		setLogin({...login,[data]: e.target.value})

	  };

	  const handleSubmit =  (event: any)=>{
	 	 dispatch(signin(username,password))
     setTimeout(() => {
      history.push(`/dashboard`)
     }, 100);
     
		  event.preventDefault()
	  }


    return (
    <>
	
  <body className="ask-bg-img">
 

<div className="ask-header">
  <div className="logo-container">
      <a href="#" className="logo">
          <img src="../images/logo.png" height="40" alt="PROMBS Admin" />
      </a>
      
  </div>

</div>

<div id="main-wrapper" className="oxyy-login-register ">
<div className="container">
  <div className="row no-gutters min-vh-100 py-5"> 
    
    <div className="col-lg-7 ">
      <div className="hero-wrap d-flex align-items-center rounded-lg rounded-right-0 h-100">
        <div className="hero-mask opacity-9"></div>
        <div className="hero-bg hero-bg-scroll" ></div>
        <div className="hero-content mx-auto w-100  d-flex flex-column">
          <div className="row no-gutters">
            <div className="col-10 col-lg-10 mx-auto">
               
            </div>
          </div>
          <div className="row no-gutters my-auto">
            <div className="col-10 col-lg-10 mx-auto">
              <h1 className="text-11 text-white mb-3"> </h1>
              <p className="text-5 text-white line-height-4 mb-4">
                <div className="aniclass">  
                  <img  className="img-fluid" src="../images/gif-img.gif"  alt="PROMBS Admin" />
              </div>

              </p>
               
              </div>
          </div>
        </div>
      </div>
    </div>
 
    <div className="col-lg-5 less-wid  d-flex align-items-center rounded-lg rounded-left-0 ">
      <div className="ask-bg-clr"> 
      <div className="container my-auto py-5">
 
        <div className="row">
          
          <div className="col-11 col-lg-10 mx-auto">
 
            <h3 className="text-center mb-4">
              
              <div className="input-icons">  <i className="fa fa-user-o icon"></i>LOGIN</div></h3>

            <div className="d-flex  flex-column align-items-center mb-4">
              <p className="text-center text-muted mb-0"> <a className="btn-link" href="#"> </a></p>
            </div>

            <form id="loginForm" className="form-dark" method="post">
              <div className="form-group">
                <div className="input-icons">
                <i className="fa fa-envelope icon"></i>
                <input value={username} onChange={handleChange('username')} type="email" className="oxyy-login-register form-dark form-control, oxyy-login-register custom-select" id="emailAddress" required placeholder="Enter Email" />
              </div>
              </div>
              
              <div className="form-group">
                <div className="input-icons">
                <i className="fa fa-key icon"></i>
                <input value={password} name="password" onChange={handleChange('password')} type="password" className="oxyy-login-register form-dark form-control, oxyy-login-register custom-select" id="loginPassword" required placeholder="Enter Password" />
              </div>
              </div>
              <div className="row">
                 
                <div className="col-sm text-2 text-right"><a className="btn-link" href="#">Forgot Password ?</a></div>
              </div>
              <button onClick={handleSubmit} className="btn btn-primary btn-block my-4" type="submit">Sign In</button>
            </form>
 
            <p className="text-2 text-center text-light mb-0">If you have any issues logging on to the portal or need any assistance.  contact us at:
              <a className="btn-link" href="register-2.html"> info@prombs.com</a></p>
          
            </div> </div>
        </div>
      </div>
    </div>
   
  </div>
</div>
</div>
</body>
 
    </>
    );
}

export default SignIn