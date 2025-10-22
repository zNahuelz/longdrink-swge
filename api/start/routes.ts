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
import StudentController from '../app/controllers/student_controller.js'
import EmployeeController from '../app/controllers/employee_controller.js'
import RoleController from '../app/controllers/role_controller.js'

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

    router
      .group(() => {
        router
          .get('/', [StudentController, 'index'])
          .use([middleware.auth(), middleware.ability(['root', 'student:index'])])
      })
      .prefix('student')

    router
      .group(() => {
        router
          .post('/', [EmployeeController, 'create'])
          .use([middleware.auth(), middleware.ability(['root', 'employee:create'])])
        router
          .get('/', [EmployeeController, 'index'])
          .use([middleware.auth(), middleware.ability(['root', 'employee:index'])])
        router
          .get('/:id', [EmployeeController, 'show'])
          .use([middleware.auth(), middleware.ability(['root', 'employee:show'])])

        router
          .put('/:id', [EmployeeController, 'update'])
          .use([middleware.auth(), middleware.ability(['root', 'employee:update'])])
      })
      .prefix('employee')

    router
      .group(() => {
        router
          .get('/', [RoleController, 'index'])
          .use([
            middleware.auth(),
            middleware.ability(['root', 'role:index', 'employee:create', 'employee:update']),
          ])
      })
      .prefix('role')
  })
  .prefix('/api/v1')
