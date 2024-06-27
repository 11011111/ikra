import { links } from 'src/common/routerLinks'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: links.CLICKER.path,
        name: links.CLICKER.name,
        component: () => import('pages/ClickerPage.vue')
      },
      {
        path: links.ONBOARDING.path,
        name: links.ONBOARDING.name,
        component: () => import('pages/OnboardingPage.vue')
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
