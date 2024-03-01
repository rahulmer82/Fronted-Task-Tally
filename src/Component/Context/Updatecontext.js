import { useContext, useState } from "react";
import mycontext from "./Createcontext";
import Alertcontext from "./AlertContext";


const Newdata=(props)=>{
    const {Checkalert}=useContext(Alertcontext)
    //https://tasktally-server.onrender.com/`
    const mydata=[]
    const host="https://second-baay.onrender.com"
    // main state this to update Clint data;
    const [Note,setNote]=useState(mydata)
    const[loading,setloading]=useState(true)



    //fetch data
    const Getnotes= async()=>{
        
        let data= await fetch(`${host}/api/data/mydata`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }
            
        });

        const json=await data.json()
        setNote(json.data);
    
        setloading(false)

        Checkalert(json.message,json.success?"Success":"Faill")
        
        
    };


    // Add Data to help This Api

    const AddNote=async(price,work)=>{
        setloading(true)
const responce=await fetch(`${host}/api/data/addwork`,{
    method:'POST',
    headers:{
        'Content-type':'Application/json',
        'auth-token':localStorage.getItem('token')
    },
    body: JSON.stringify({price,work})
});
const json= await responce.json()
setNote(Note.concat(json.data))
setloading(false)

Checkalert(json.message,json.success?"Success":"Faill")
    };

    // edit note using api calls;

    const EditNote=async (id,price,date,work,dailywork)=>{
        setloading(true)
const responce=await fetch(`${host}/api/data/update/${id}`,{
    method:'PATCH',
    headers:{
        'Content-type':'Application/json',
        'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({price,work,date})
    
});
const json=await responce.json()

let newNotes = JSON.parse(JSON.stringify(Note))
// Logic to edit in client
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if (element._id === id) {
    newNotes[index].price = price;
    newNotes[index].work =work;
    newNotes[index].date= date; 
    newNotes[index].dailywork=dailywork
    break; 
  }
} 
setNote(newNotes)

setloading(false)
Checkalert(json.message,json.success?"Success":"Faill")
    }
    

  // Delete Notes using API calls;
  const DeleteNote=async(id)=>{
    setloading(true)
const response=await fetch(`${host}/api/data/delete/${id}`,{
    method:'DELETE',
    headers:{
        'Content-type':'Application/json',
        'auth-token':localStorage.getItem('token')
    }
})
 const json= await response.json();
const Newnote= Note.filter((note)=>{return note._id !==id})
setNote(Newnote)

setloading(false)
Checkalert(json.message, json.success?"Success":"Faill")
  }  

  // filter my data

 



return (
<mycontext.Provider value={{Note,Getnotes,DeleteNote,AddNote,EditNote,loading}} >
    {props.children}
</mycontext.Provider>
);
}

export default Newdata;