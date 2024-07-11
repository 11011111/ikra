import { links } from 'src/common/routerLinks'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '/', component: () => import('pages/IndexPage.vue') },
      {
        path: links.CLICKER.path,
        name: links.CLICKER.name,
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: links.CLICKER_POST.path,
        name: links.CLICKER_POST.name,
        component: () => import('pages/ClickerPostPage.vue')
      },
      {
        path: links.TOP.path,
        name: links.TOP.name,
        component: () => import('pages/TOP100.vue')
      },
      {
        path: links.EXCHANGE.path,
        name: links.EXCHANGE.name,
        component: () => import('pages/ExchangePage.vue')
      },
      {
        path: links.ONBOARDING.path,
        name: links.ONBOARDING.name,
        component: () => import('pages/OnboardingPage.vue')
      },
      {
        path: links.TEST.path,
        name: links.TEST.name,
        component: () => import('pages/TestPage.vue')
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
