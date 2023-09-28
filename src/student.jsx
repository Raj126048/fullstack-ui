import axios from 'axios';
import {useEffect, useState } from "react";
import './student.css';
 
function Student()
{
    const [studentid, setId] = useState('');
    const [studentname, setName] = useState("");
    const [studentaddress, setAddress] = useState("");
    const [mobile, setMobile] = useState("I");
    const [division, setDivision] = useState("A");
    const [gender, setGender] = useState("Male");
    const [students, setUsers] = useState([]);
  
  
   
  useEffect(() => {
    (async () => await Load())();
    }, []);
   
   
    async function  Load()
    {
       const result = await axios.get(
           "https://njj.onrender.com/api/v1/Student/getall");
           setUsers(result.data);
           console.log(result.data);
    }
   
  
    
       async function save(event)
      {
          event.preventDefault();
      try
          {
           await axios.post("https://njj.onrender.com/api/v1/Student/save",
          {
          studentname: studentname,
          studentaddress: studentaddress,
            mobile: mobile,
            division:division,
            gender:gender
          });
            alert("Student Registation Successfully");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setDivision("");
            setGender("");
            Load();
          }
      catch(err)
          {
            alert("User Registation Failed");
          }
     }
  
   
     async function editStudent(students)
     {
      setName(students.studentname);
      setAddress(students.studentaddress);
      setMobile(students.mobile); 
      setDivision(students.division);
      setGender(students.gender);
      setId(students._id);
     }
   
     async function DeleteStudent(studentid)
     {
          await axios.delete("https://njj.onrender.com/api/v1/Student/delete/" + studentid); 
          alert("Student deleted Successfully");
          Load();
     }
   
     async function update(event)
     {
      event.preventDefault();
   
     try
         {
          await axios.put("https://njj.onrender.com/api/v1/Student/edit/" + studentid ,
         {
  
          studentname: studentname,
          studentaddress: studentaddress,
           mobile: mobile,
           division:division,
           gender: gender
         
         });
           alert("Registation Updateddddd");
           setId("");
           setName("");
           setAddress("");
           setMobile("");
           setDivision("");
           setGender("");
           Load();
         }
     catch(err)
         {
           alert("Student Updateddd Failed");
         }
    }
  
    return (
        <div className='full'>
           <h1>Student Details</h1>
           <div class="container mt-4" >
              <form>
                 
                  <div class="form-group">
                    <label>Student Name</label>
                    <input  type="text" class="form-control" id="studentname"
                    value={studentname} required
                    onChange={(event) =>
                      {
                        setName(event.target.value);      
                      }}
                    />
                  </div>
    
    
                  <div class="form-group">
                    <label>Date of birth</label>
                    <input  type="date" class="form-control" id="studentaddress" 
                     value={studentaddress} required
                      onChange={(event) =>
                        {
                          setAddress(event.target.value);      
                        }}
                    />
                  </div>
    
                  <div class="form-group">
                    <label>Class</label>
                    <select class="form-control" id="mobile" 
                      value={mobile} required
                    onChange={(event) =>
                      {
                        setMobile(event.target.value);      
                      }}
                    >
                      <option >I</option>
                      <option >II</option>
                      <option >III</option>
                      <option >IV</option>
                      <option >V</option>
                      <option >VI</option>
                      <option >VII</option>
                      <option >VIII</option>
                      <option >IX</option>
                      <option >X</option>
                      <option >XI</option>
                      <option >XII</option>
                    </select>
    
    
                  </div>
                  <div class="form-group">
                    <label>Division</label>
                    <select class="form-control" id="division" 
                      value={division} required
                    onChange={(event) =>
                      {
                        setDivision(event.target.value);      
                      }}
                    >
                      <option >A</option>
                      <option >B</option>
                      <option >C</option>
                    
                    </select>
    
    
                  </div>
                  <div class="form-group">
                    <h6>Gender</h6>
                    <input type="radio" name='gender'  id="Male" 
                      value="Male" required 
                    onChange={(event) =>
                      {
                        setGender(event.target.value);    
                      
                      }}
                    />Male
                         <input type="radio" name='gender' id="Female" 
                      value="Female"
                    onChange={(event) =>
                      {
                        setGender(event.target.value);      
                      }}
                    />Female
    
    
                  </div>
                  <div>
                  <button   class="btn btn-primary mt-4 reg"  onClick={save}>Register</button>
    
                  <button   class="btn btn-warning mt-4 up"  onClick={update}>Update</button>
                  </div>   
                </form>
              </div>
                    <br/>
    <table class="table table-dark" align="center">
      <thead>
        <tr>
          <th scope="col">Student Name</th>
          <th scope="col">Date of birth</th>
          <th scope="col">Class</th>
          <th scope="col">Division</th>
          <th scope="col">Gender</th>
          
          <th scope="col">Option</th>
        </tr>
      </thead>
           {students.map(function fn(student)
           {
                return(
                <tbody>
                    <tr>
                    <td>{student.studentname}</td>
                    <td>{student.studentaddress}</td>
                    <td>{student.mobile}</td> 
                    <td>{student.division}</td> 
                    <td>{student.gender}</td>        
                    <td>
                        <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                        <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete</button>
                    </td>
                    </tr>
                </tbody>
                );
                })}
                </table>
           </div>
                );
            }
      
      export default Student;  
