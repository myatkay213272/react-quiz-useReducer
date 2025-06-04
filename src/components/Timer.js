import { useEffect } from "react"

const Timer = ({dispatch,secondRemaining}) => {

    useEffect(()=>{
        const id = setInterval(()=>{
            dispatch({type : 'tick'})
        },1000)

        return ()=> clearInterval(id)
    },[dispatch])

  return (
    <div>{secondRemaining}</div>
  )
}

export default Timer