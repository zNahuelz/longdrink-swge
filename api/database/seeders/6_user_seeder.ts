import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../app/models/role.js'
import User from '../../app/models/user.js'
import Teacher from '../../app/models/teacher.js'
import Student from '../../app/models/student.js'

export default class extends BaseSeeder {
  async run() {
    const adminRole = await Role.findBy('name', 'ADMINISTRADOR')
    const teacherRole = await Role.findBy('name', 'DOCENTE')
    const studentRole = await Role.findBy('name', 'ALUMNO')
    const receptionistRole = await Role.findBy('name', 'SECRETARIA')

    const teacher = await Teacher.firstOrFail()
    const student = await Student.firstOrFail()

    if (!adminRole || !teacherRole || !studentRole || !receptionistRole) {
      console.warn('Rol no encontrado. Ejecute el seeder de roles primero.')
      return
    }

    await User.create({
      username: 'admin',
      email: 'admin@longdrink.com',
      password: 'admin',
      roleId: adminRole.id,
      employeeId: 1,
    })

    await User.create({
      username: 'teacher',
      email: 'teacher@longdrink.com',
      password: 'teacher',
      roleId: teacherRole.id,
      teacherId: teacher.id,
    })

    await User.create({
      username: 'student',
      email: 'student@longdrink.com',
      password: 'student',
      roleId: studentRole.id,
      studentId: student.id,
    })

    await User.create({
      username: 'receptionist',
      email: 'receptionist@longdrink.com',
      password: 'receptionist',
      roleId: receptionistRole.id,
      employeeId: 2,
    })
  }
}
