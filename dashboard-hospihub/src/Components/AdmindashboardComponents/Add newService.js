import { NavLink, Navigate, useNavigate } from "react-router-dom";
import SideBarAdmin from "./sideBarComponent";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlus, faSign } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function AddNewService() {
    const [Hospital, setHospital] = useState({})
    const navigate = useNavigate()
    const servicesList = ["médecine générale", "immunologie", "radiologie", "chirurgie", "neurologie", "pneumologie", "cardiologie", "odontologie", "dermatologie", "service accueil de traitement des urgences"
        , " traumatologie", "  médecine interne", "endocrinologie", " anatomo-pathologie", " hématologie", " gastro-entérologie", "urologie", "pharmacie", "maternité", "Pédiatrie"
        , "Service des grands brûlés"]

    const [requiredName, setrequiredName] = useState(false)
    const [requiredDescription, setrequiredDescription] = useState(false)
    const [requiredEmailService, setrequiredEmailService] = useState(false)
    const [ShowErrorMessage, setShowErrorMessage] = useState(false)
    const [emailverifform, setemailverifform] = useState(false)
    const [ErrorMail, setErrorMail] = useState(false)
    const [ErrorName, setErrorName] = useState(false)

    const [NewService, setNewService] = useState({
        ServiceName: "",
        Description: "",
        EmailService: ""
    })



    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`http://localhost:5000/hospital/getHospitalById/${decodedToken.id}`)
                .then((response) => {
                    console.log(response.data)
                    setHospital(response.data)
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        console.log(error.response.data.error)
                    }
                })

        }
    }, []);

    const logOut = () => {
        localStorage.clear();

        // Vider les cookies
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
        navigate("/signIn")
    }


    const onValueChange = (e) => {
        e.preventDefault()
        setNewService({ ...NewService, [e.target.name]: e.target.value })
    }

    const addNewService = () => {
        console.log(NewService)
        if (NewService.ServiceName === "" || NewService.Description === "" || NewService.EmailService === "") {
            setShowErrorMessage(true)
        }
        else {

            axios.post(`http://localhost:5000/service/addservice/${Hospital._id}`, NewService)
                .then((response) => {
                    console.log(response.data)
                    
                    navigate("/ListServices")

                })
                .catch((error) => {

                    if (error.response.data.errors.name) {
                        setErrorName(true)
                        setErrorMail(false)
                    }

                    if (error.response.data.errors.email) {
                        setErrorMail(true)
                        setErrorName(false)
                    }
                    console.log(ErrorMail)

                })
        }

    }


    return (
        <>
            <div>
                <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>

                <SideBarAdmin hospital={Hospital.HospitalName} ></SideBarAdmin>
                <main className="main-content position-relative border-radius-lg ">
                    {/* Navbar */}
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                        <div className="container-fluid py-1 px-3">

                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                                <ul className="navbar-nav  justify-content-end">
                                    <li className="nav-item d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white font-weight-bold px-0 pt-3 ">
                                            <Button variant="primary" onClick={() => { logOut() }}>
                                                <FontAwesomeIcon icon={faLock} className="px-2" />Log Out
                                            </Button>
                                        </a>
                                    </li>
                                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white p-0" id="iconNavbarSidenav">
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




                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <form >
                                        <div className="card-body">
                                            <p className="text-uppercase text-sm">Service Information</p>
                                            {ShowErrorMessage && (
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
                                                        All fields are required !
                                                    </div>
                                                </Alert>
                                            )}



                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="example-text-input" className="form-control-label">* Service Name</label>
                                                    <select className="form-control bg-light p-1 m-1" name='ServiceName' onChange={(e) => onValueChange(e)} onBlur={() => setrequiredName(NewService.ServiceName === "")}>
                                                        <option value="" selected className="text-sm">Select Service Name</option>
                                                        {servicesList.map((serv) => (
                                                            <option value={serv}>
                                                                {serv}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {requiredName && (
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
                                                                Service name is required!
                                                            </div>
                                                        </Alert>
                                                    )}
                                                    {ErrorName && (
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
                                                                service name  already exists!
                                                            </div>
                                                        </Alert>
                                                    )}
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="example-text-input" className="form-control-label">* Email Service</label>
                                                        <input className="form-control" type="email" name="EmailService" onChange={(e) => onValueChange(e)} required onBlur={() => { setrequiredEmailService(NewService.EmailService==="")}} />
                                                    </div>
                                                    {requiredEmailService && (
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
                                                                Email service is required!
                                                            </div>
                                                        </Alert>
                                                    )}
                                                    {/* {emailverifform && (
                                                        <Alert variant="danger" className="mt-1">
                                                            <div
                                                                className="form-icon-wrapper"
                                                                style={{
                                                                    height: "40px",
                                                                    fontSize: "14px",
                                                                    marginTop: "-11px",
                                                                    marginBottom: "-13px",
                                                                    fontWeight: "bold"

                                                                }}>
                                                                Email Service invalid you must have this format ServiceName.hospitalname+@gmail.com
                                                            </div>
                                                        </Alert>
                                                    )} */}

                                                   <small  style={{
                                                                   
                                                                    fontSize: "12px",
                                                                    marginTop: "-11px",
                                                                    marginBottom: "-13px",
                                                                    fontWeight: "bold",
                                                                    color:"red"

                                                                }}>*Email Service must have this format ServiceName.hospitalname+@gmail.com</small>

                                                    {ErrorMail && (
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
                                                                Email already exists!
                                                            </div>
                                                        </Alert>
                                                    )}

                                                </div>
                                            </div>


                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="example-text-input" className="form-control-label" >* Description</label>
                                                    <textarea className="form-control" type="text" required name='Description' onChange={(e) => onValueChange(e)} onBlur={() => setrequiredDescription(NewService.Description==="")} />
                                                </div>
                                                {requiredDescription && (
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
                                                            Description is required!
                                                        </div>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="card-footer pb-0 d-flex justify-content-end">
                                                <div className="">
                                                    <Button variant="success" onClick={() => { addNewService() }} >
                                                        <FontAwesomeIcon /> Add New Hospital
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default AddNewService;
