import Loginpage from './pages/LoginPage';
import { BrowserRouter,Route,Routes} from "react-router-dom";
import './styles/_style.scss'
import Registrationpage from './pages/RegistrationPage';
import Mainpage from './pages/MainPage';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hook/auth.hook';
import Todolist from './pages/TodoList';


// ------------------------------------------------ //


const App = () => {
    const {login,logout, id, isReady} = useAuth()
    const isLogin = !!id


  return (
    <AuthContext.Provider value={{login,logout, id, isReady,isLogin}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Mainpage/>} />
            <Route path='/login' element={<Loginpage/>}/>
            <Route path='/registration' element={<Registrationpage/>}/>
            <Route path="/todo-list" element={ isLogin ?<Todolist/> : <Loginpage/>} />
          </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
