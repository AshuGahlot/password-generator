import { useCallback, useEffect, useState, useRef } from 'react'

function App() {

  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState('')

  const passwordGenrator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberallowed) str += '0123456789'
    if(charallowed) str += '!@#$%&'
    for(let i=1; i<=length; i++ ){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  },[length,numberallowed,charallowed,setpassword]) 

  // useRef Hook
  const passwordref =  useRef(null)
  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
  },[password])

  useEffect(() => {
    passwordGenrator()
  },[length,numberallowed,charallowed,passwordGenrator])

  return (
    <>
    <div className='w-1/2 max-w-lg mx-auto h-52 shadow-md mt-60 rounded-lg px-4 my-8 text-white text-center bg-gray-500'>Password Generator
    <div className='flex shadow rounded-lg mt-4 overflow-hidden mb-4'>
      <input 
      type="text"
      value={password} 
      placeholder='Password'
      className='outline-none w-full py-1 px-3 text-black'
      readOnly
      ref={passwordref}
      />
      <button className='bg-blue-500 w-20 shrink-0 hover:bg-blue-800' onClick={copyPassword}>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={16}
        value={length}
        className='cursor-pointer text-blue-500 accent-blue-500'
        onChange={(e) => {setlength(e.target.value)}}
        />
        <label>Length: ({length})</label>
      </div>

      <div className='flex items-center gap-x-1 mx-3 accent-blue-500'>
        <input 
        type="checkbox"
        defaultChecked={numberallowed}
        onChange={() => {setnumberallowed((prev) => !prev)}}
        />
        <label>Numbers</label>
      </div>

      <div className='flex items-center gap-x-1 accent-blue-500'>
        <input 
        type="checkbox"
        defaultChecked={charallowed}
        onChange={() => {setcharallowed((prev) => ! prev)}}
        />
        <label>Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
