/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import showAll from '@/pages/showAllTest.vue'
import addContact from '@/pages/addContact.vue'
import Reg_edit from '@/pages/reg_edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: showAll,
      alias: ['/dashboard','/all'],   // Alias for the /home route

    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Reg_edit,
    //   alias: ['/dashboard','/all'],   // Alias for the /home route

    // },
    {
      path: '/add',
      name: 'addContact',
      component: addContact,
      alias: '/create',   // Alias for the /home route

    },
    
    // ,
    // {
    //   path: '/add',
    //   name: 'add',
    //   component: addContact,
    // },
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
