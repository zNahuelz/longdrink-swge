import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { LoginValidator } from '../validators/login.js'
import Employee from '../models/employee.js'
import Teacher from '../models/teacher.js'
import Student from '../models/student.js'

export default class AuthController {
  async login({ request, response, auth }: HttpContext) {
    const { username, password, rememberMe } = await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(username, password)

    await user.load('role', (roleQuery) => {
      roleQuery.preload('abilities')
    })

    const abilities = user.role.abilities.map((a) => a.key)

    const token = await auth
      .use('api')
      .createToken(user, abilities, { expiresIn: rememberMe ? '7 days' : '24 hours' })
    return token
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('api').invalidateToken()

      return response.ok({
        message: 'Sesión cerrada correctamente.',
      })
    } catch (error) {
      return response.unauthorized({
        message: 'No se pudo cerrar la sesión o el token ya expiró.',
      })
    }
  }

  public async profile({ auth, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'Token expirado o inválido.' })
    }

    await user.load('role')

    let personalInfo = null
    if (user.employeeId != null) {
      personalInfo = await Employee.find(user.employeeId)
    }

    if (user.studentId != null) {
      personalInfo = await Student.find(user.studentId)
    }

    if (user.teacherId != null) {
      personalInfo = await Teacher.find(user.teacherId)
    }

    const userData = {
      ...user.serialize(),
      personalInfo: personalInfo ? personalInfo.serialize() : null,
      token: {
        isExpired: auth.user?.currentAccessToken?.isExpired,
        abilities: auth.user?.currentAccessToken?.abilities,
      },
    }

    return response.ok(userData)
  }
}
