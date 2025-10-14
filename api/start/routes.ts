/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '../app/controllers/auth_controller.js'
import { middleware } from './kernel.js'
import TeacherController from '../app/controllers/teacher_controller.js'

router
  .get('/admin', async () => {
    return {
      hello: 'world',
    }
  })
  .use([middleware.auth(), middleware.ability(['root'])])

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
        router.get('profile', [AuthController, 'profile']).use(middleware.auth())
      })
      .prefix('auth')

    router
      .group(() => {
        router
          .get('/', [TeacherController, 'index'])
          .use([middleware.auth(), middleware.ability(['root', 'teacher:index'])])
      })
      .prefix('teacher')
  })
  .prefix('/api/v1')
