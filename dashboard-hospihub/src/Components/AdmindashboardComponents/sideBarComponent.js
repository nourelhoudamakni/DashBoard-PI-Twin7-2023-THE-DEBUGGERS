import { NavLink } from "react-router-dom";



function SideBarAdmin(props) {
    return ( 
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
          <a className="navbar-brand m-0 " href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
            <img src="./assets/images/userlogo.png " className="navbar-brand-img h-100 mb-1" alt="main_logo" />
            <span className="ms-1 font-weight-bold " style={{fontSize:"18px"}}>{` ${props.hospital} Dashboard`}</span>
          </a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
          <ul className="navbar-nav">
          <li className="nav-item">
          <NavLink to="/DashboardAdmin"  className="nav-link">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ListServices"  className="nav-link">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Hospitals Services </span>
          </NavLink>
        </li>
        <li className="/nav-item">
          <NavLink to="/UnvalidatedDoctors"   className="nav-link">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-02 text-dark text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Unvalidated Doctors</span>
          </NavLink>
        </li>
        <li className="/nav-item">
          <NavLink to="/listDoctors"   className="nav-link">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-02 text-dark text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Doctors</span>
          </NavLink>
        </li>
          </ul>
        </div>      
      </aside>
     );
}

export default SideBarAdmin;