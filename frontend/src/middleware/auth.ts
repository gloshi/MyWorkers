import { createListenerMiddleware } from '@reduxjs/toolkit'
import { auth } from '../app/config/auth'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: auth.endpoints.login.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()

    if (action.payload.token) {
      localStorage.setItem('token', action.payload.token);
    }
  },
})