import React, {useRef} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = ({update}) => {
    const username = useRef()
    const pass = useRef()
    const nav = useNavigate()

    function logUser() {
        const user = {
            email: username.current.value,
            pass: pass.current.value,
        }
        const options = {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(user)
      }

      fetch('http://localhost:4001/login', options)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        update()
        if (data.success){
            nav("/main")
        }
    })
    } 
    return(
        <div className='inputWrapper'>
            <div className='inputs'>
                <input type="text" placeholder="username" ref={username} />
                <input type="text" placeholder="password" ref={pass}/>
                <button onClick={logUser}>Login</button>
            </div>
        </div>
    )
}

export default Login