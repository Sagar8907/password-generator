import { useState, useCallback, useEffect,useRef } from 'react'
//use ref is the referece hook ot givea reference
import "./App.css"
function App() {
  const [length, setLength] = useState(9);
  const [numberallowed,setnumberallowed] = useState(false);
  const [charallowed,setcharallowed] = useState(false);
  const [password,setpassword] = useState("")
  //ref hook
  const passwordRef = useRef(null);
  const copypassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordgenertor= useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str+="0123456789"
    if(charallowed) str+="!@#$%^&*_-";
    for(let i=1; i<=length; i++ ){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  },[length,charallowed,setpassword])
  useEffect(()=>{
    passwordgenertor()
  },[length,numberallowed,charallowed,passwordgenertor])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 mb-4 text-orange-500 bg-gray-700">
      <h1 className='text-white text-center text-md'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-white rounded-md' placeholder='password' readOnly />
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypassword}>copy</button>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={8} max={50} className='cursor-pointer'onChange={(e)=>{setLength(e.target.value)}} ref={passwordRef}/>
      <label>length: {length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={numberallowed} id='numberinput' onChange={()=>{setnumberallowed((prev)=>!prev)}}/>
      <label htmlFor="numberinput">Numbers</label>
      <input type="checkbox" defaultChecked={charallowed} id='charinput' onChange={()=>{setcharallowed((prev)=>!prev)}}/>
      <label htmlFor="charinput">characters</label>
    </div>
    </div>
   </>
  )
}

export default App
