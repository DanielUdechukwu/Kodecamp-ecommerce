import React from "react";
import Confetti from "../assets/party-popper.png"

const Success = () => {

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-[#d1d5db] w-90%">
        <div>
          <img src={Confetti} alt="" />
        </div>

        <div>
          <p>Password Reset Link Sent to your Mail</p>
        </div>
      </div>
    </div>
  )
}

export default Success