import React, { useContext} from 'react'
import Alertcontext from './Context/AlertContext'

export default function Alerts() {
  
    const {alert}=useContext(Alertcontext)

  return (
    <>
    
    <div  className='alertbox' style={{height:'4rem'}}>
      <div > 
     {alert && <div className='alert alert-info  myalert' role="alert">
  <strong>{alert.type}</strong> : {alert.msg}
</div> } 
    </div>
    </div> 



    </>
  )
}