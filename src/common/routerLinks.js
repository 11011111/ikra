export const links = {
  CLICKER: {
    path: 'clicker',
    name: 'clicker',
  },
  ONBOARDING: {
    path: 'onboarding',
    name: 'onboarding'
  },
}

export const apiLinks = {
  AUTH: {
    list: '/bot/auth',
    retrieve: () => '/bot/auth'
  },
  ME: {
    list: '/me'
  },
  USER: {
    list: '/user'
  },
  ONBOARDING: {
    list: '/bot/onboarding',
    retrieve: (id) => `/bot/onboarding/${id}`
  },
  TOP_USERS: {
    list: '/users/top',
    retrieve: (id) => `/users/top/${id}`
  }
}
