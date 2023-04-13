import "./styleAccount.css"
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
function SignInComponent() {
    const navigate=useNavigate();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [EmailErrorMessage, setEmailErrorMessage] = useState(false)
    const [PasswordErrorMessage, setPasswordErrorMessage] = useState(false)



    const login = async () => {
        await axios.post('http://localhost:5000/loginAdmin', {
            email: email,
            password: password,
        })
            .then((response) => {
                Cookies.set("jwt", response.data.token);
                const jwtCookie = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("jwt="));
                if (jwtCookie) {
                    const jwtToken = jwtCookie.split("=")[1];
                    const decodedToken = jwt_decode(jwtToken);
                    const id = decodedToken.id;
                }
                localStorage.setItem("jwtToken", jwtCookie);
                const token = localStorage.getItem('jwtToken');
                if(token){
                   const idToken=jwt_decode(token).id;
                   const role=jwt_decode(token).role;
                   console.log(role)
                   if(role==="Admin")
                   {
                    navigate("/DashboardAdmin")
                   }
                   if(role==="SuperAdmin")
                   {
                    navigate("/DashboardSuperadmin")
                   }
                }


            })
            .catch((error) => {
                if (error.response.data.errors.ErrorEmail) {
                    setPasswordErrorMessage(false);
                    setEmailErrorMessage(true);

                }
                if (error.response.data.errors.ErrorPassword) {
                    setEmailErrorMessage(false);
                    setPasswordErrorMessage(true);
                }

            })

    }

    return (
        <>
            <div className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        {/* Navbar */}
                        <nav className="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
                            <div className="container-fluid">
                                <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="../pages/dashboard.html">
                                    Argon Dashboard 2
                                </a>
                                <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon mt-2">
                                        <span className="navbar-toggler-bar bar1" />
                                        <span className="navbar-toggler-bar bar2" />
                                        <span className="navbar-toggler-bar bar3" />
                                    </span>
                                </button>
                                <div className="collapse navbar-collapse" id="navigation">
                                    <ul className="navbar-nav mx-auto">
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                                                <i className="fa fa-chart-pie opacity-6 text-dark me-1" />
                                                Dashboard
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link me-2" href="../pages/profile.html">
                                                <i className="fa fa-user opacity-6 text-dark me-1" />
                                                Profile
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link me-2" href="../pages/sign-up.html">
                                                <i className="fas fa-user-circle opacity-6 text-dark me-1" />
                                                Sign Up
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link me-2" href="../pages/sign-in.html">
                                                <i className="fas fa-key opacity-6 text-dark me-1" />
                                                Sign In
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav d-lg-block d-none">
                                        <li className="nav-item">
                                            <a href="https://www.creative-tim.com/product/argon-dashboard" className="btn btn-sm mb-0 me-1 btn-primary">Free Download</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* End Navbar */}
                    </div>
                </div>
            </div>




            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                    <div className="card card-plain card-signIn">
                                        <div className="card-header pb-0 text-start  card-signIn">
                                            <h4 className="font-weight-bolder">Sign In</h4>
                                            <p className="mb-0 text-muted">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="card-body">
                                            <form role="form">
                                                <div className="mb-3">
                                                    <input type="email" className="form-control form-control-lg form-SignIn" placeholder="Email" aria-label="Email" name="email" value={email} onChange={(e) => setemail(e.target.value)} required />
                                                </div>
                                                {EmailErrorMessage && (
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
                                                           Email is not registred ! Check your email !
                                                        </div>
                                                    </Alert>
                                                )}

                                                <div className="mb-3">
                                                    <input type="password" className="form-control form-control-lg form-SignIn" placeholder="Password" aria-label="Password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                                                </div>
                                                
                                                {PasswordErrorMessage && (
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
                                                           Password is incorrect ! Check your password !
                                                        </div>
                                                    </Alert>
                                                )}

                                                <Button variant="primary" onClick={() => login()} >
                                                    Sign In
                                                </Button>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1 card-signIn">
                                            <p className="mb-4 text-sm mx-auto">
                                                Don't have an account?
                                                <a href="javascript:;" className="text-primary text-gradient font-weight-bold">Sign up</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                    <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{ backgroundImage: 'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg")', backgroundSize: 'cover' }}>
                                        <span className="mask bg-gradient-primary opacity-6" />
                                        <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                                        <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default SignInComponent;