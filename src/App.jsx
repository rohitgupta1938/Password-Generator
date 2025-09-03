import { generate } from 'random-words'
import { useRef } from 'react';
import { useState, useCallback, useEffect } from 'react'
function App() {
  const [color, setColor] = useState("rgb(27 18 57)")
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!{\}=+/()[]#@$%^&*_?:;-.`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    console.log(pass)
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  }
,[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
         bg-gray-700 text-orange-500'>
        <h1 className='text-2xl text-center text-white my-4'>Generate Password</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            value={password}
            type="text"
            className='outline-none w-full py-1 px-3'
            placeholder="password"
            readOnly
            ref={passwordRef}
            />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '
          onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 justify-around'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              value={length}
              min={6}
              max={99}
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length : ({length})</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
