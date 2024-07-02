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
    list: '/auth',
    retrieve: () => '/auth'
  },
  ME: {
    list: '/me'
  },
  USER: {
    list: '/user'
  },
  ONBOARDING: {
    list: '/onboarding',
    retrieve: (id) => `/onboarding/${id}`
  },
  TOP_USERS: {
    list: '/users/top',
    retrieve: (id) => `/users/top/${id}`
  },
  TAP: {
    list: '/clicker/tap',
    retrieve: (id) => `/clicker/tap/${id}`
  },
  STATUS: {
    list: '/clicker/status',
    retrieve: (id) => `/clicker/status/${id}`
  }
}
