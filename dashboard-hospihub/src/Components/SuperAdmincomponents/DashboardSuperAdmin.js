import { NavLink } from "react-router-dom";
function DashboardSuperAdmin() {
    return ( 
        <>
         <div>
         <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.7 }}></div>
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
          <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
              <img src="./assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" />
              <span className="ms-1 font-weight-bold">Argon Dashboard 2</span>
            </a>
          </div>
          <hr className="horizontal dark mt-0" />
          <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink to="/DashboardSuperadmin"  className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/ListHospitals"  className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Hospitals</span>
            </NavLink>
          </li>
          <li className="/nav-item">
            <NavLink to="/signIn"   className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-dark text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Sign In</span>
            </NavLink>
          </li>
            </ul>
          </div>      
        </aside>
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
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Number of hospitals</p>
                          <h5 className="font-weight-bolder">
                            $53,000
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                          <i className="fa-solid fa-wave-pulse text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Today's Users</p>
                          <h5 className="font-weight-bolder">
                            2,300
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                          <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">New Clients</p>
                          <h5 className="font-weight-bolder">
                            +3,462
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                          <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Sales</p>
                          <h5 className="font-weight-bolder">
                            $103,430
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                          <i className="ni ni-cart text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
{/* tableaux */}
            <div className="row mt-4">
              <div className="col-lg-7 mb-lg-0 mb-4">
                <div className="card ">
                  <div className="card-header pb-0 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-2">List of hospitals with more appointments</h6>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center ">
                      <tbody>
                        <tr>
                          <td className="w-30">
                            <div className="d-flex px-2 py-1 align-items-center">
                             
                              <div className="ms-4">
                                <p className="text-xs font-weight-bold mb-0">Hospital Name:</p>
                                <h6 className="text-sm mb-0">United States</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <p className="text-xs font-weight-bold mb-0">Address:</p>
                              <h6 className="text-sm mb-0">2500</h6>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <p className="text-xs font-weight-bold mb-0">Admin Email:</p>
                              <h6 className="text-sm mb-0">$230,900</h6>
                            </div>
                          </td>
                          <td className="align-middle text-sm">
                            <div className="col text-center">
                              <p className="text-xs font-weight-bold mb-0">Number of Appointments:</p>
                              <h6 className="text-sm mb-0">29.9%</h6>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
              <div className="card ">
                  <div className="card-header pb-0 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-2">List of hospitals With the number of complaints</h6>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center ">
                      <tbody>
                        <tr>
                          <td className="w-30">
                            <div className="d-flex px-2 py-1 align-items-center">
                             
                              <div className="ms-4">
                                <p className="text-xs font-weight-bold mb-0">Hospital Name:</p>
                                <h6 className="text-sm mb-0">United States</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <p className="text-xs font-weight-bold mb-0">Number of Complaints:</p>
                              <h6 className="text-sm mb-0">2500</h6>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default DashboardSuperAdmin;