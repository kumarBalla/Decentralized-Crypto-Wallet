import {useNavigate,useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmployeeService from '../Services/EmployeeService.js';

function UpdateEmployee() 
{
  let navigate = useNavigate();
  const {id} = useParams();

  const [name,setName] = useState("");
  const [doj,setDoj] = useState("");
  const [department,setDepartment]= useState({deptName:"",designation:""});

  const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/");
  }

  useEffect(()=>{
    EmployeeService.getEmployeeById(id).then(res=>{
        setName(res.data.name);
        setDoj(res.data.doj);
        setDepartment({
          deptName: res.data.dept.deptName,
          designation: res.data.dept.designation
        })
    })
  },[])

  const handleUpdate=(e)=>{
    e.preventDefault();
    const updateEmployee={
      name,
      doj,
      dept:{
          deptName: department.deptName,
          designation: department.designation
      }
    }

    EmployeeService.updateEmployee(id,updateEmployee).then(res=>{
        navigate("/");
    })
  }


  return (
    <div className="pt-5">
           <div className="container pt-5">
              <div className="card offset-3 w-50 p-3">
                  <h5 className="text-center">Update Employee</h5>
                  <form> 
                  <label className="my-2">Name:</label>
                  <input type="text" name="name" id="name" className="form-control"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}/>

                  <label className="my-2">DOJ:</label>
                  <input type="text" name="doj" id="doj" className="form-control"
                  value={doj}
                  onChange={(e)=> setDoj(e.target.value)}/>

                  <label className="my-2">Department:</label>
                  <input type="text" name="deptName" id="deptName" className="form-control"
                  value={department.deptName}
                  onChange={(e)=> setDepartment({...department,deptName:e.target.value})}/>

                  <label className="my-2">Designation:</label>
                  <input type="text" name="designation" id="designation" className="form-control"
                  value={department.designation}
                  onChange={(e)=> setDepartment({...department,designation:e.target.value})}/>

                  <button className="btn btn-danger w-25 mt-3 float-start" onClick={handleCancel}> cancel </button>
                  <button className="btn btn-success w-25 mt-3 float-end" onClick={handleUpdate}> submit </button>
                  </form> 
              </div>
           </div>
    </div>
  )
}

export default UpdateEmployee;