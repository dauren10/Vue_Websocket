import { createPinia } from 'pinia'

export const useAuthStore = createPinia({
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    login (email, password) {
      // Login logic
    },

    logout () {
      // Logout logic
    },
  },
})