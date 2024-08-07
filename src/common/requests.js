import { api } from 'boot/axios'
import { apiLinks } from 'src/common/routerLinks'

export const methods = {
  get: 'get',
  post: 'post',
  patch: 'patch',
  put: 'put',
  delete: 'delete'
}

const request = (requestData) => {
  return api.request({
    url:
      requestData.urlParam && requestData.link.retrieve
        ? requestData.link.retrieve(requestData.urlParam)
        : `${requestData.link.list}${
          requestData.query ? `?${requestData.query}` : '' // add check ?query params
        }`,
    method: requestData.method || methods.get,
    data:
    // POST PUT PATCH DELETE
      requestData.method !== methods.get
        ? { ...requestData.params }
        : undefined,
    params:
    // GET
      !requestData.method || requestData.method === methods.get
        ? { ...requestData.params }
        : undefined
  })
}

/**
 * Создание набора предзаполненных реквестов
 */


// Авторизоваться
export const authRequest = (incomingData) =>
request({ ...incomingData, link: apiLinks.AUTH })

// Получить Onboarding
export const onboardingRequest = (incomingData) =>
request({ ...incomingData, link: apiLinks.ONBOARDING })

// Получить Me
export const meRequest = (incomingData) =>
request({ ...incomingData, link: apiLinks.ME })

// User
export const userRequest = (incomingData) =>
  request({ ...incomingData, link: apiLinks.USER })

// Клик по кнопке
export const tapRequest = (incomingData) =>
  request({ ...incomingData, link: apiLinks.TAP })

// Получить Статус
export const statusRequest = (incomingData) =>
  request({ ...incomingData, link: apiLinks.STATUS })

// Получить ТОП 100 юзеров
export const top100Request = (incomingData) =>
  request({ ...incomingData, link: apiLinks.TOP_USERS })

// Получить список заданий
export const tasksRequest = (incomingData) =>
  request({ ...incomingData, link: apiLinks.TASKS })
