import React from 'react'

const StartScreen = ({numQuestion}) => {
  return (
    <div>
        <h2>Welcome to The React Quiz!</h2>
        <p>{numQuestion} question to test your React mastery</p>
    </div>
  )
}

export default StartScreen