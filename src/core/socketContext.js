import React from 'react'
import io from 'socket.io-client'
import {ContextStore} from "./context";

const SocketContext = React.createContext()
//const socket = io("http://localhost:1234")

const SocketProvider = React.memo(props => {

    // const {Parse} = React.useContext(ContextStore)
    // const connectListener = (data) => {
    //     socket.emit("presence",{ status: true})
    // }
    // const userMessage = (data) => {
    // }

    React.useEffect(() => {
        // socket.on("connection", connectListener)
        // socket.on(Parse.User.current().id, userMessage)
        //
        // return () => {
        //     socket.off(Parse.User.current().id, userMessage)
        // }
    }, [])

    return <SocketContext.Provider>
        {props.children}
    </SocketContext.Provider>
})

export default SocketContext
export {SocketProvider}

