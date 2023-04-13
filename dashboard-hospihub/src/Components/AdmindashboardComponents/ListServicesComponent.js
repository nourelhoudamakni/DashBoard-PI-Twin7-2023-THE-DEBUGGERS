import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faList, faPencil, faPlus, faTrash, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Alert from "react-bootstrap/Alert";
import SideBarAdmin from "./sideBarComponent";


function ListServicesComponent() {
    const navigate = useNavigate()
    const [Services, setServices] = useState([])
    const [Hospital, setHospital] = useState({})
    const [AddServiceModalShow, setAddServiceModalShow] = useState(false)
    const servicesList = ["médecine générale", "immunologie", "radiologie", "chirurgie", "neurologie", "pneumologie", "cardiologie", "odontologie", "dermatologie", "service accueil de traitement des urgences"
        , " traumatologie", "  médecine interne", "endocrinologie", " anatomo-pathologie", " hématologie", " gastro-entérologie", "urologie", "pharmacie", "maternité", "Pédiatrie"
        , "Service des grands brûlés"]

    const [newService, setnewService] = useState({})
    const [requiredName, setrequiredName] = useState(false)
    const [requiredDescription, setrequiredDescription] = useState(false)
    const [requiredEmailService, setrequiredEmailService] = useState(false)
    const [emailverifform, setemailverifform] = useState(false)
    const [idService, setidService] = useState("")
    const [showUpdate, setshowUpdate] = useState(false)
    const [showModelDelete, setshowModelDelete] = useState(false)
    const [updateService, setupdateService] = useState({})
    const [showModelList, setshowModelList] = useState(false)
    const [Doctors, setDoctors] = useState([])
    const [ErrorMail,setErrorMail]=useState(false)
    const [ErrorName,setErrorName]=useState(false)

    const onValueChange = (e) => {
        e.preventDefault()
        setnewService({ ...newService, [e.target.name]: e.target.value })
    }
    const { ServiceName, Description, EmailService } = updateService

    const onHandleChange = (e) => {
        e.preventDefault()
        setupdateService({ ...updateService, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`http://localhost:5000/service/gethospitalservices/${decodedToken.id}`)
                .then((response) => {
                    console.log(response.data)
                    setServices(response.data)
                })
                .catch((error) => {
                    if (error.response.data.message) {
                        console.log(error.response.data.message)
                    }
                })
            console.log(Services)

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

    const addNewService = () => {
        axios.post(`http://localhost:5000/service/addservice/${Hospital._id}`, newService)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/service/gethospitalservices/${Hospital._id}`)
                    .then((response) => {
                        console.log(response.data)
                        setServices(response.data)
                    })
            })
            .catch((error) => {

                if (error.response.data.errors.name) {
                 setErrorName(true)
                
                }
                if (error.response.data.errors.email) {
                 
                    setErrorMail(true)
                }
               console.log(ErrorMail)

            })
    }
    const finServicebyId = async (id) => {
        await axios.get(`http://localhost:5000/service/getServiceById/${id}`)
            .then((response) => {
                console.log(response.data)
                setupdateService(response.data)


            })
            .catch((error) => {
                if (error.response.data.error) {
                    console.log(error.response.data.error)
                }
            })
    }
    const UpdateService = () => {
        axios.put(`http://localhost:5000/service/updateservice/${idService}`, updateService)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/service/gethospitalservices/${Hospital._id}`)
                    .then((response) => {
                        console.log(response.data)
                        setServices(response.data)
                    })
            })
            .catch((error) => {

                if (error.response.data.message) {
                    console.log(error.response.data.message)


                }
            })

    }

    const deleteService = (id) => {
        axios.delete(`http://localhost:5000/service/deleteservice/${id}`)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/service/gethospitalservices/${Hospital._id}`)
                    .then((response) => {
                        console.log(response.data)
                        setServices(response.data)
                    })
            })
            .catch((error) => {

                if (error.response.data.message) {
                    console.log(error.response.data.message)


                }
            })
    }

    const getAllDoctors = async (id) => {
        await axios.get(`http://localhost:5000/admin/getdoctorsconfirmedvalidated/${id}`)
            .then((response) => {
                console.log(response.data)
                setDoctors(response.data)
                console.log(Doctors)

            })
            .catch((error) => {
                if (error.response.data.error) {
                    console.log(error.response.data.error)
                }
            })
    }
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

    return (
        <>
            <div>
                <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>

                {!showModelList && !AddServiceModalShow && !showModelDelete && <SideBarAdmin hospital={Hospital.HospitalName}></SideBarAdmin>
                }


                <main className="main-content position-relative border-radius-lg ">
                    {/* Navbar */}
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                        <div className="container-fluid py-1 px-3">

                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                                <ul className="navbar-nav  justify-content-end">
                                <li className="nav-item d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white font-weight-bold px-0 pt-3 ">
                                            <Button variant="primary"  onClick={()=>{logOut()}}>
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
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center col-4">
                                <div className="input-group">
                                    <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true" /></span>
                                    <input type="text" className="form-control" placeholder="Type here..." />
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <div className="card mb-4">
                                    <div className="card-header pb-0 d-flex justify-content-between">
                                        <h6>List of {Hospital.HospitalName} hospital services</h6>

                                        <Button variant="primary" onClick={() => setAddServiceModalShow(true)} >
                                            <FontAwesomeIcon icon={faPlus} /> Add New Service
                                        </Button>

                                    </div>
                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Service Name</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Description</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Email Service</th>

                                                        <th className="text-secondary opacity-7" />
                                                    </tr>
                                                </thead>



                                                {
                                                    Services.map((e) => {
                                                        return (
                                                            <>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex px-2 py-1">
                                                                                <div className="d-flex flex-column justify-content-center">
                                                                                    <p className="text-xs font-weight-bold mb-0 ps-2">{e.ServiceName}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <p className="text-xs font-weight-bold mb-0">{e.Description}</p>
                                                                        </td>
                                                                        <td className="align-middle text-center text-sm">
                                                                            <p className="text-xs font-weight-bold mb-0">{e.EmailService}</p>

                                                                        </td>

                                                                        <td className="align-middle  ">
                                                                            <Button variant="danger" className="mx-2" onClick={() => { setshowModelDelete(!showModelDelete) }}>
                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                            </Button>
                                                                            <Button variant="success" onClick={() => { setidService(e._id); finServicebyId(e._id); setshowUpdate(!showUpdate) }} >
                                                                                <FontAwesomeIcon icon={faPencil} />
                                                                            </Button>
                                                                            <Button variant="warning" className="mx-2" onClick={() => { setshowModelList(!showModelList); getAllDoctors(e._id) }} >
                                                                                <FontAwesomeIcon icon={faList} /> Doctors List
                                                                            </Button>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                                <Modal

                                                                    aria-labelledby="contained-modal-title-vcenter"
                                                                    centered
                                                                    show={showModelDelete}
                                                                    onHide={() => setshowModelDelete(false)}
                                                                >
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                                            Confirmation
                                                                        </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <p>Confirm if you want to delete this element</p>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={() => { setshowModelDelete(false) }}>
                                                                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close
                                                                        </Button>
                                                                        <Button variant="primary" onClick={() => { deleteService(e._id); setshowModelDelete(false) }}>
                                                                            Confirm
                                                                        </Button>
                                                                    </Modal.Footer>
                                                                </Modal>



                                                                <Modal
                                                                    aria-labelledby="contained-modal-title-vcenter"
                                                                    centered
                                                                    show={showModelList}
                                                                    onHide={() => setshowModelList(false)}
                                                                    size="lg"
                                                                >
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                                            List Doctors of {e.ServiceName} Service
                                                                        </Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>


                                                                        <div className="table-responsive p-0">
                                                                            <table className="table align-items-center mb-0">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"> First Name</th>
                                                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Last Name</th>
                                                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Email </th>
                                                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">phone number</th>
                                                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">workTime</th>
                                                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">state</th>

                                                                                        <th className="text-secondary opacity-7" />
                                                                                    </tr>
                                                                                </thead>

                                                                                {
                                                                                    Doctors.map((e) => {
                                                                                        return (
                                                                                            <>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <div className="d-flex px-2 py-1">
                                                                                                                <div className="d-flex flex-column justify-content-center">
                                                                                                                    <p className="text-xs font-weight-bold mb-0 ps-2">{e.firstName}</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <p className="text-xs font-weight-bold mb-0">{e.lastName}</p>
                                                                                                        </td>
                                                                                                        <td className="align-middle text-center text-sm">
                                                                                                            <p className="text-xs font-weight-bold mb-0">{e.email}</p>
                                                                                                        </td>
                                                                                                        <td className="align-middle text-center text-sm">
                                                                                                            <p className="text-xs font-weight-bold mb-0">{e.phoneNumber}</p>
                                                                                                        </td>
                                                                                                        <td className="align-middle text-center text-sm">
                                                                                                            <p className="text-xs font-weight-bold mb-0">{e.WorkTime}</p>
                                                                                                        </td>
                                                                                                        <td className="align-middle text-center text-sm">
                                                                                                            <p className="text-xs font-weight-bold mb-0">{e.IsValidated}</p>
                                                                                                        </td>
                                                                                                    </tr>

                                                                                                </tbody>
                                                                                            </>
                                                                                        )
                                                                                    })}
                                                                            </table>
                                                                        </div>

                                                                    </Modal.Body >
                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={() => { setshowModelList(false) }}>
                                                                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close
                                                                        </Button>
                                                                        <Button variant="primary" onClick={() => { setshowModelList(false) }}>
                                                                            Confirm
                                                                        </Button>
                                                                    </Modal.Footer>
                                                                </Modal>

                                                            </>
                                                        )
                                                    })}


                                            </table >
                                            <Modal
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                show={AddServiceModalShow}
                                                onHide={() => setAddServiceModalShow(false)}
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        Add New Service
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <label htmlFor="example-text-input" className="form-control-label">Service Name</label>
                                                    <select className="form-control bg-light p-1 m-1" name='ServiceName' onChange={(e) => onValueChange(e)} onBlur={() => setrequiredName(/^\s*$/.test(newService.ServiceName))}>
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
                                                                Service name is already exist!
                                                            </div>
                                                        </Alert>
                                                    )}
                                                    <div className="form-group">
                                                        <label htmlFor="example-text-input" className="form-control-label" >Description</label>
                                                        <textarea className="form-control" type="text" required name='Description' onChange={(e) => onValueChange(e)} onBlur={() => setrequiredDescription(/^\s*$/.test(newService.Description))} />
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
                                                    <div className="form-group">
                                                        <label htmlFor="example-text-input" className="form-control-label">Email Service</label>
                                                        <input className="form-control" type="email" name="EmailService" onChange={(e) => onValueChange(e)} required onBlur={() => { setrequiredEmailService(/^\s*$/.test(newService.EmailService)); setemailverifform(!/^[a-zA-Z]\.[a-zA-Z]+@gmail\.com$/.test(newService.EmailService)) }} />
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
                                                    {emailverifform && (
                                                        <Alert variant="danger" className="mt-1">
                                                            <div
                                                                className="form-icon-wrapper"
                                                                style={{
                                                                    height: "40px",
                                                                    fontSize: "14px",
                                                                    marginTop: "-11px",
                                                                    marginBottom: "-13px",
                                                                    fontWeight: "bold"

                                                                }}
                                                            >
                                                                Email Service invalid you must have this format ServiceName+hospitalname+@gmail.com
                                                            </div>
                                                        </Alert>
                                                    )}
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
                                                                Email is already exist!
                                                            </div>
                                                        </Alert>
                                                    )}

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => { setAddServiceModalShow(false) }}>
                                                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close
                                                    </Button>
                                                    <Button variant="primary" onClick={() => { addNewService(); setAddServiceModalShow(false) }}>
                                                        Confirm
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {showUpdate && <div className="col-12 mt-2 ">
                            <div className="card mb-4 container">
                                <div className="card-header pb-0 d-flex justify-content-between ">
                                    <h6>Update Service </h6>
                                </div>
                                <div className="card-body px-0 pt-0 pb-2">
                                    <div className="row ">
                                        <div className="col-md-6 ">
                                            <label htmlFor="example-text-input" className="form-control-label">Service Name</label>
                                            <select className="form-control bg-light p-1 m-1" name='ServiceName' onChange={(e) => onHandleChange(e)} value={ServiceName} onBlur={() => setrequiredName(/^\s*$/.test(ServiceName))}>
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
                                        </div>
                                        <div className="col-md-6 ">
                                            <div className="form-group">
                                                <label htmlFor="example-text-input" className="form-control-label">Email Service</label>
                                                <input className="form-control" type="email" name="EmailService" onChange={(e) => onHandleChange(e)} value={EmailService} required onBlur={() => { setrequiredEmailService(/^\s*$/.test(EmailService)); setemailverifform(!/^[a-zA-Z]\.[a-zA-Z0-9]+@gmail\.com$/.test(EmailService)) }} />
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
                                            {emailverifform && (
                                                <Alert variant="danger" className="mt-1">
                                                    <div
                                                        className="form-icon-wrapper"
                                                        style={{
                                                            height: "40px",
                                                            fontSize: "14px",
                                                            marginTop: "-11px",
                                                            marginBottom: "-13px",
                                                            fontWeight: "bold"

                                                        }}
                                                    >
                                                        Email Service invalid you must have this format ServiceName+hospitalname+@gmail.com
                                                    </div>
                                                </Alert>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="form-group">
                                            <label htmlFor="example-text-input" className="form-control-label" >Description</label>
                                            <textarea className="form-control" type="text" required name='Description' onChange={(e) => onHandleChange(e)} value={Description} onBlur={() => setrequiredDescription(/^\s*$/.test(Description))} />
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
                                    <Button variant="primary" onClick={() => UpdateService()}>
                                        Update
                                    </Button>
                                </div>

                            </div>
                        </div>}
                    </div >

                </main>
            </div>
        </>
    );
}

export default ListServicesComponent;