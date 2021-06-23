import React from "react"

const NotificationContext = React.createContext()

export const NotificationProvider = NotificationContext.Provider
export const NotificationConSumer = NotificationContext.Consumer
export default NotificationContext