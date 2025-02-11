import type React from "react"
import { useState, useRef, type ChangeEvent, type KeyboardEvent } from "react"

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    console.log("Submitted OTP:", otpString)
    // Here you would typically send the OTP to your backend for verification
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center bg-gradient-to-b from-blue-300 to-blue-500">
      <div className="bg-slate-100/90 p-8 rounded-lg h-96 w-96 items-center justify-center flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  )
}

export default OTPVerification

