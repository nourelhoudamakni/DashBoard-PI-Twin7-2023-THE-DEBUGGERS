import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil, faPlus, faTrash, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import SideBarAdmin from "./sideBarComponent";
import jwt_decode from "jwt-decode";

function ListDoctorUnvalidated(props) {
    const {idService}=useParams()
    const navigate = useNavigate()
    const [doctors, setdoctors] = useState([])
    const [Hospital, setHospital] = useState({})


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


        axios.get(`http://localhost:5000/admin/getdoctorsconfirmednonvalidated/${decodedToken.id}`)
        .then((response) => {
            console.log(response.data)
            setdoctors(response.data)
        })
        .catch((error) => {
            if (error.response.data.errors) {
                console.log(error.response.data.errors)
            }
        })
        console.log(doctors)
        }
        
    }, []);


    const validateDoctor = (id) => {

        const token = localStorage.getItem('jwtToken');
        if (token) {
        const decodedToken = jwt_decode(token);
        console.log(id)
        axios.put(`http://localhost:5000/admin/validatedoctor/${id}`)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/admin/getdoctorsconfirmednonvalidated/${decodedToken.id}`)
                    .then((response) => {
                        console.log(response.data)
                        setdoctors(response.data)
                    })

            })
            .catch((error) => {
                if (error.response.data.errors) {
                    console.log(error.response.data.errors)
                }
            })
        }

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

                <SideBarAdmin hospital={Hospital.HospitalName} ></SideBarAdmin>
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

                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"> First Name</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Last Name</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Email </th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">phone number</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Action</th>

                                                       
                                                    </tr>
                                                </thead>
                                                {
                                                    doctors.map((e) => {
     
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
                                                                        <Button variant="success" onClick={() => validateDoctor(e._id)}>
                                                                            <FontAwesomeIcon icon={faPlus} /> Validate
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>

                                                        </>
                                                  )})
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

export default ListDoctorUnvalidated;