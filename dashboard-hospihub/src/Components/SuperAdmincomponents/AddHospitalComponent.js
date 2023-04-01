
import "./StyleSuperAdmin.css"
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";

function AddHospitalComponent() {
  const [Hospital, SetHospital] = useState({})
  const [phoneNumberErrorMessage, SetphoneNumberErrorMessage] = useState(false)
  const [passwordErrorMessage, SetpasswordErrorMessage] = useState(false)
  const [emailErrorMessage, SetemailErrorMessage] = useState(false)
  const [confirmPasswordErrorMessage, SetconfirmPasswordErrorMessage] = useState(false)
  const [errorMessage, seterrorMessage] = useState(false)
  const [RequiredHospital, setRequiredHospital] = useState(false)
  const [RequiredEmail, setRequiredEmail] = useState(false)
  const [RequiredAddress, setRequiredAddress] = useState(false)
  const [RequiredPhone, setRequiredPhone] = useState(false)
  const [RequiredPassword, setRequiredPassword] = useState(false)
  const [RequiredConfirm, setRequiredConfirm] = useState(false)
  const[succesShow,setsuccesShow]=useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    SetHospital({ ...Hospital, [e.target.name]: e.target.value })
  }

  const AddHospital = async () => {


    if (!/^Admin\.[a-zA-Z0-9]+@gmail\.com$/.test(Hospital.AdminEmail)) {
      SetemailErrorMessage(true);
      return;
    }


    if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(Hospital.PasswordAdmin)) {
      SetpasswordErrorMessage(true);
      return;
    }

    if (!/^\d{8}$/.test(Hospital.PhoneNumber)) {
      SetphoneNumberErrorMessage(true);
      return;
    }

    if (Hospital.PasswordAdmin !== Hospital.confirmPasswordAdmin) {
      SetconfirmPasswordErrorMessage(true);
      return;
    }


    console.log(Hospital)
    await axios.post('http://localhost:5000/hospital/addHospitalwithAdmin', Hospital)
      .then((response) => {
        console.log(response.data)
        setsuccesShow(true)
      })
      .catch((error) => {

        if (error.response.data.errors) {
          console.log(error.response.data.errors)
          seterrorMessage(true)

        }
      })
  }




  return (
    <>
      <div>
        <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>
        <aside className="sidenav  bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
          <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
              <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" />
              <span className="ms-1 font-weight-bold">Dashboard</span>
            </a>
          </div>

          <hr className="horizontal dark mt-0" />
          <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/DashboardSuperadmin" className="nav-link">
                  <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/ListHospitals" className="nav-link">
                  <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
                  </div>
                  <span className="nav-link-text ms-1">Hospitals</span>
                </NavLink>
              </li>
              <li className="/nav-item" >
                <NavLink to="/signIn" className="nav-link">
                  <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="ni ni-single-02 text-dark text-sm opacity-10" />
                  </div>
                  <span className="nav-link-text ms-1">Sign In</span>
                </NavLink>
              </li>

            </ul>
          </div>
        </aside>

        <div className="main-content position-relative max-height-vh-100 h-100">
          {/* Navbar */}
          <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2 mt-n11">
            <div className="container-fluid py-1">
              <div className="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2" id="navbar">

                <ul className="navbar-nav justify-content-end">
                  <li className="nav-item d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-white font-weight-bold px-0">
                      <i className="fa fa-user me-sm-1" />
                      <span className="d-sm-inline d-none">Sign In</span>
                    </a>
                  </li>
                  <li className="nav-item d-xl-none ps-3 pe-0 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-white p-0">
                    </a><a href="javascript:;" className="nav-link text-white p-0" id="iconNavbarSidenav">
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line bg-white" />
                        <i className="sidenav-toggler-line bg-white" />
                        <i className="sidenav-toggler-line bg-white" />
                      </div>
                    </a>
                  </li>
                  <li className="nav-item px-3 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-white p-0">
                      <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                    </a>
                  </li>
                  <li className="nav-item dropdown pe-2 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-bell cursor-pointer" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* End Navbar */}
          <div className="card shadow-lg mx-4 card-profile-bottom">
            <div className="card-body p-3">
              <div className="row gx-4">
                <div className="col-auto">
                  <div className="avatar avatar-xl position-relative">
                    <img src="../assets/img/team-1.jpg" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                  </div>
                </div>
                <div className="col-auto my-auto">
                  <div className="h-100">
                    <h5 className="mb-1">
                      Sayo Kravits
                    </h5>
                    <p className="mb-0 font-weight-bold text-sm">
                      Public Relations
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                  <div className="nav-wrapper position-relative end-0">
                    <ul className="nav nav-pills nav-fill p-1" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="true">
                          <i className="ni ni-app" />
                          <span className="ms-2">App</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="false">
                          <i className="ni ni-email-83" />
                          <span className="ms-2">Messages</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center " data-bs-toggle="tab" href="javascript:;" role="tab" aria-selected="false">
                          <i className="ni ni-settings-gear-65" />
                          <span className="ms-2">Settings</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* input fields  */}
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <form >
                    <div className="card-body">
                      <p className="text-uppercase text-sm">Hospital Information</p>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label">Hospital Name</label>
                          <input className="form-control" type="text" name="HospitalName" onChange={(e) => handleChange(e)} required onBlur={() => setRequiredHospital(/^\s*$/.test(Hospital.HospitalName))} />
                          {RequiredHospital && (
                            <Alert variant="danger" className="mt-1">
                              <div
                                className="form-icon-wrapper"
                                style={{
                                  height: "20px",
                                  fontSize: "14px",
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                  fontWeight: "bold"

                                }}
                              >
                                Hospital name is required!
                              </div>
                            </Alert>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Address</label>
                            <input className="form-control" type="text" name="HospitalAddress" onChange={(e) => handleChange(e)} required onBlur={() => setRequiredAddress(/^\s*$/.test(Hospital.HospitalAddress))}/>
                            {RequiredAddress && (
                              <Alert variant="danger" className="mt-1">
                              <div
                                className="form-icon-wrapper"
                                style={{
                                  height: "20px",
                                  fontSize: "14px",
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                  fontWeight: "bold"

                                }}
                              >
                                  Address is required!
                                </div>
                              </Alert>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Phone Number</label>
                            <input className="form-control" type="text" name="PhoneNumber" onChange={(e) => handleChange(e)} onBlur={() => {SetphoneNumberErrorMessage(!/^\d{8}$/.test(Hospital.PhoneNumber));setRequiredPhone(/^\s*$/.test(Hospital.PhoneNumber))}} required />
                        
                            {RequiredPhone && (
                              <Alert variant="danger" className="mt-1">
                              <div
                                className="form-icon-wrapper"
                                style={{
                                  height: "20px",
                                  fontSize: "14px",
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                  fontWeight: "bold"

                                }}
                              >
                                  The phone number is required!
                                </div>
                              </Alert>
                            )}
                                {phoneNumberErrorMessage && (
                              <Alert variant="danger" className="mt-1">
                              <div
                                className="form-icon-wrapper"
                                style={{
                                  height: "20px",
                                  fontSize: "14px",
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                  fontWeight: "bold"

                                }}
                              >
                                  The phone number must contain at least 8 characters !
                                </div>
                              </Alert>
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-uppercase text-sm">Aministrator Information</p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Email address</label>
                            <input className="form-control" type="email" placeholder="jesse@example.com" name="AdminEmail" onChange={(e) => handleChange(e)} onBlur={() => {SetemailErrorMessage(!/^Admin\.[a-zA-Z0-9]+@gmail\.com$/.test(Hospital.AdminEmail));setRequiredEmail(/^\s*$/.test(Hospital.AdminEmail))}} required />
                            {RequiredEmail && (
                              <Alert className="form-group mt-1" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "20px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  Email address is required !
                                </div>
                              </Alert>
                            )}
                  
                            {emailErrorMessage && (
                              <Alert className="form-group" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "20px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  Email address invalid you must have this format Admin+hospitalname+number+@gmail.com
                                </div>
                              </Alert>
                            )}
                            {errorMessage && (
                              <Alert className="form-group" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "20px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  email already exist!
                                </div>
                              </Alert>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Password</label>
                            <input className="form-control" type="password" name="PasswordAdmin" onChange={(e) => handleChange(e)} onBlur={() => {SetpasswordErrorMessage(! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(Hospital.PasswordAdmin)); setRequiredPassword(/^\s*$/.test(Hospital.PasswordAdmin))}} required />
                            {RequiredPassword && (
                              <Alert className="form-group mt-1" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "20px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  The password is required !
                                </div>
                              </Alert>
                            )}
                      
                            {passwordErrorMessage && (
                              <Alert className="form-group" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "60px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  The password must contain at least 8 characters one lowercase, one uppercase, one number and one special character !
                                </div>
                              </Alert>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Confirm Password</label>
                            <input className="form-control" type="password" name="confirmPasswordAdmin" onChange={(e) => handleChange(e)} onBlur={() => {SetconfirmPasswordErrorMessage(Hospital.PasswordAdmin !== Hospital.confirmPasswordAdmin);setRequiredConfirm(/^\s*$/.test(Hospital.confirmPasswordAdmin))}} required />
                            {RequiredConfirm && (
                              <Alert className="form-group mt-1" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "20px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  confirm password is required!
                                </div>
                              </Alert>
                            )}
                            
                            
                            
                            {confirmPasswordErrorMessage && (
                              <Alert className="form-group" variant="danger">
                                <div
                                  className="form-icon-wrapper  "
                                  style={{
                                    height: "20px",
                                    fontSize: "14px",
                                    marginTop: "-11px",
                                    marginBottom: "-13px",
                                    fontWeight: "bold"
  
                                  }}
                                >
                                  Wrong password confirmation !
                                </div>
                              </Alert>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="card-footer pb-0">
                      <div className="d-flex align-items-center">
                        <Button variant="primary" onClick={() => AddHospital()} >
                          <FontAwesomeIcon icon={faPlus} /> Add New Hospital
                        </Button>
                        {succesShow && (
                            <Alert variant="success mx-3" className="mt-1">
                              <div
                                className="form-icon-wrapper"
                                style={{
                                  height: "20px",
                                  fontSize: "14px",
                                  marginTop: "-11px",
                                  marginBottom: "-13px",
                                  fontWeight: "bold"

                                }}
                              >
                                Hospital added successfully!!
                              </div>
                            </Alert>
                          )}

                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-profile">
                  <img src="assets/images/administrator1.jpg" alt="Image placeholder" className="card-img-top" style={{ opacity: 0.9 }} />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default AddHospitalComponent;