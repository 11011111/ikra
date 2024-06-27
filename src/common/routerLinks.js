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
  ONBOARDING: {
    list: '/onboarding',
    retrieve: (id) => `/onboarding/${id}`
  },
}
