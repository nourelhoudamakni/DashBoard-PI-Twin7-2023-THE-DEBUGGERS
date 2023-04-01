import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import "./StyleSuperAdmin.css"

function HospitalListComponent(props) {
    const navigate = useNavigate()
    const [Hospitals, setHospitals] = useState([])
    const [idHospitalToDelete, setidHospitalToDelete] = useState("")
    const[ModalShow,setModalShow]=useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/hospital/getAllHospitals')
            .then((response) => {
                console.log(response.data)
                setHospitals(response.data)
            })
            .catch((error) => {
                if (error.response.data.errors) {
                    console.log(error.response.data.errors)
                }
            })
        console.log(Hospitals)

    }, []);

    console.log(idHospitalToDelete)

    const deleteHospital=()=>{
        axios.delete(`http://localhost:5000/hospital/deleteHospital/${idHospitalToDelete}`)
        .then((response)=>{
            axios.get('http://localhost:5000/hospital/getAllHospitals')
            .then((response) => {
                console.log(response.data)
                setHospitals(response.data)
            })
        })
        .catch((error) => {
            if (error.response.data.errors) {
                console.log(error.response.data.errors)
            }
        })
    }

    return (
        <>
             <div>
             <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>

             {!ModalShow && <aside className="sidenav  navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
                    <div className="sidenav-header">
                        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                        <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
                            <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" />
                            <span className="ms-1 font-weight-bold">Argon Dashboard 2</span>
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
            }


                <main className="main-content position-relative border-radius-lg ">
                    {/* Navbar */}
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                        <div className="container-fluid py-1 px-3">

                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                                <ul className="navbar-nav  justify-content-end">
                                    <li className="nav-item d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white font-weight-bold px-0">
                                            <i className="fa fa-user me-sm-1" />
                                            <span className="d-sm-inline d-none">Sign In</span>
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
                                        <h6>Hospitals List</h6>

                                        <Button variant="primary" onClick={() => navigate("/AddHospital")}>
                                            <FontAwesomeIcon icon={faPlus} /> Add New Hospital
                                        </Button>

                                    </div>
                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Hospital Name</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Address</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Phone Number</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Email Admin</th>
                                                        <th className="text-secondary opacity-7" />
                                                    </tr>
                                                </thead>
                                                {
                                                    Hospitals.map((e) => {
                                                        return (
                                                            <>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex px-2 py-1">
                                                                                <div className="d-flex flex-column justify-content-center">
                                                                                    <p className="text-xs font-weight-bold mb-0 ps-2">{e.HospitalName}</p>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <p className="text-xs font-weight-bold mb-0">{e.HospitalAddress}</p>
                                                                        </td>
                                                                        <td className="align-middle text-center text-sm">
                                                                            <p className="text-xs font-weight-bold mb-0">{e.PhoneNumber}</p>

                                                                        </td>
                                                                        <td className="align-middle text-center">
                                                                            <p className="text-xs font-weight-bold mb-0">{e.AdminEmail}</p>
                                                                        </td>
                                                                        <td className="align-middle  ">
                                                                            <Button variant="danger" className="mx-2" onClick={() => {setidHospitalToDelete(e._id);setModalShow(true)}}>
                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                            </Button>
                                                                            <Button variant="success" onClick={()=>navigate(`/UpdateHospital/${e._id}`)}>
                                                                                <FontAwesomeIcon icon={faPencil} />
                                                                            </Button>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                                <Modal
                                                                    aria-labelledby="contained-modal-title-vcenter"
                                                                    centered
                                                                    show={ModalShow}
                                                                    onHide={() => setModalShow(false)}
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
                                                                    <Button variant="secondary"  onClick={() => {setModalShow(false)}}>
                                                                               <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close 
                                                                    </Button>
                                                                    <Button variant="primary"  onClick={() => {deleteHospital();setModalShow(false)}}>
                                                                             Confirm 
                                                                    </Button>
                                                                    </Modal.Footer>
                                                                </Modal>

                                                            </>
                                                        )
                                                    })
                                                }

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default HospitalListComponent;