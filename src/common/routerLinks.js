export const links = {
  CLICKER: {
    path: 'clicker',
    name: 'clicker',
  },
  CLICKER_POST: {
    path: 'clicker_post',
    name: 'clicker_post',
  },
  ONBOARDING: {
    path: 'onboarding',
    name: 'onboarding'
  },
  TOP: {
    path: 'top_users',
    name: 'top_users'
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
