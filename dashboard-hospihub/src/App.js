import './App.css';
import { Routes , Route } from 'react-router-dom';
import SignInComponent from './Components/AccountComponents/SignInComponent';
import ProfileComponent from './Components/AccountComponents/ProfileComponent';
import AddHospitalComponent from './Components/SuperAdmincomponents/AddHospitalComponent';
import UpdateHospitalComponent from './Components/SuperAdmincomponents/UpdateHospitalComponent';
import HospitalListComponent from './Components/SuperAdmincomponents/HospitalsListComponent';
import DashboardSuperAdmin from './Components/SuperAdmincomponents/DashboardSuperAdmin';
import ListServicesComponent from './Components/AdmindashboardComponents/ListServicesComponent';

function App() {
  return (
    <>
   <Routes>
   <Route path='/signIn' element={<SignInComponent></SignInComponent>}></Route>
   <Route path='/profile' element={<ProfileComponent></ProfileComponent>}></Route>

   {/* Routes dashboard SuperAdmin */}
   <Route path='/AddHospital' element={<AddHospitalComponent></AddHospitalComponent>}></Route>
   <Route path='/UpdateHospital/:idHospitalToUpdate' element={<UpdateHospitalComponent></UpdateHospitalComponent>}></Route>
   <Route path='/ListHospitals' element={<HospitalListComponent></HospitalListComponent>}></Route>
   <Route path='/DashboardSuperadmin' element={<DashboardSuperAdmin></DashboardSuperAdmin>}></Route>


   {/* Routes dashboard Admin */}
   <Route path='/ListServices' element={<ListServicesComponent></ListServicesComponent>}></Route>

   </Routes>
   </>
  );
}

export default App;
