import { useState } from 'react'
import './App.css'
import OtpInput from './components/OtpInput'

function App() {
  const [otp, setOtp] = useState('')

  const onOtpChange = (event) => {
    console.log(event);
  }

  return (
    <>
    <OtpInput otpLength={6} onChange={onOtpChange} />
    </>
  )
}

export default App
