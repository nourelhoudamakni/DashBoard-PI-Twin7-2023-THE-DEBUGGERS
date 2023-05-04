import './App.css';
import { Routes , Route } from 'react-router-dom';
import SignInComponent from './Components/AccountComponents/SignInComponent';
import ProfileComponent from './Components/AccountComponents/ProfileComponent';
import AddHospitalComponent from './Components/SuperAdmincomponents/AddHospitalComponent';
import UpdateHospitalComponent from './Components/SuperAdmincomponents/UpdateHospitalComponent';
import HospitalListComponent from './Components/SuperAdmincomponents/HospitalsListComponent';
import DashboardSuperAdmin from './Components/SuperAdmincomponents/DashboardSuperAdmin';
import ListServicesComponent from './Components/AdmindashboardComponents/ListServicesComponent';
import DashboardAdmin from './Components/AdmindashboardComponents/DashboardAdmin';
import ListDoctorUnvalidated from './Components/AdmindashboardComponents/UnvalidatedDoctors';
import SideBarAdmin from './Components/AdmindashboardComponents/sideBarComponent';
import ListDoctors from './Components/AdmindashboardComponents/ListDoctorsValidated';
import AddNewService from './Components/AdmindashboardComponents/Add newService';

function App() {
  return (
    <>
   <Routes>
   <Route path='' element={<SignInComponent></SignInComponent>}></Route>
   <Route path='/signIn' element={<SignInComponent></SignInComponent>}></Route>
   <Route path='/profile' element={<ProfileComponent></ProfileComponent>}></Route>

   {/* Routes dashboard SuperAdmin */}
   <Route path='/AddHospital' element={<AddHospitalComponent></AddHospitalComponent>}></Route>
   <Route path='/UpdateHospital/:idHospitalToUpdate' element={<UpdateHospitalComponent></UpdateHospitalComponent>}></Route>
   <Route path='/ListHospitals' element={<HospitalListComponent></HospitalListComponent>}></Route>
   <Route path='/DashboardSuperadmin' element={<DashboardSuperAdmin></DashboardSuperAdmin>}></Route>
   <Route path='/sideBarAdmin' element={<SideBarAdmin></SideBarAdmin>}></Route>


   {/* Routes dashboard Admin */}
   <Route path='/DashboardAdmin' element={<DashboardAdmin></DashboardAdmin>}></Route>
   <Route path='/ListServices' element={<ListServicesComponent></ListServicesComponent>}></Route>
   <Route path='/UnvalidatedDoctors' element={<ListDoctorUnvalidated></ListDoctorUnvalidated>}></Route>
   <Route path='/listDoctors' element={<ListDoctors></ListDoctors>}></Route>
   <Route path='/AddnewService' element={<AddNewService></AddNewService>}></Route>


   </Routes>
   </>  
  );
}

export default App;
