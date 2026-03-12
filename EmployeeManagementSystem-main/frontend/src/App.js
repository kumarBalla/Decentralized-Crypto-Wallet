import './App.css';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import UpdateEmployee from './components/UpdateEmployee';
function App()
{

    return (
        <div className="bg-color">
            <Header/>
            
            <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route exact path='/' element={<EmployeeList/>}></Route>
                    <Route path='/employees' element={<EmployeeList/>}></Route>
                    <Route path='/add-emp' element={<CreateEmployee/>}></Route>
                    <Route path='/update-emp/:id' element={<UpdateEmployee/>}></Route>
                </Routes>
            </div>
            </BrowserRouter>

            <Footer/>
        </div>
    )
}
export default App;
