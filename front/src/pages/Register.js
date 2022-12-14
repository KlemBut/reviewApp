import {useRef} from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const nav = useNavigate()
    const username = useRef()
    const pass = useRef()
    const pass2 = useRef()
    function regUser() {
        const user = {
            email: username.current.value,
            passOne: pass.current.value,
            passTwo: pass2.current.value
        }
        const options = {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      }

      fetch('http://localhost:4001/register', options)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        username.current.value = ""
        pass.current.value = ""
        pass2.current.value = ""
        nav("/")
        })
    } 
    return(
        <div className='inputWrapper'>
            <div className='inputs'>
                <input type="text" placeholder="username" ref={username} />
                <input type="text" placeholder="password" ref={pass}/>
                <input type="text" placeholder="password repeat" ref={pass2}/>
                <button onClick={regUser}>Register</button>
            </div>
        </div>
    )
    
}

export default Register