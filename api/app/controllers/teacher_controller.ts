import type { HttpContext } from '@adonisjs/core/http'
import Teacher from '../models/teacher.js'

export default class TeacherController {
  public async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const search = request.input('search', '')
      const searchBy = request.input('searchBy', 'all') // 'names' | 'citizen_id' | 'id' | 'all'
      const status = request.input('status', 'available') // 'available' | 'deleted' | 'all'
      const orderBy = request.input('orderBy', 'names')
      const orderDir = request.input('orderDir', 'asc') // 'asc' | 'desc'

      const query = Teacher.query()

      if (search) {
        query.where((q) => {
          switch (searchBy) {
            case 'id':
              q.where('id', search)
              break
            case 'citizen_id':
              q.whereILike('citizen_id', `%${search}%`)
              break
            case 'names':
              q.whereILike('names', `%${search}%`)
                .orWhereILike('paternal_surname', `%${search}%`)
                .orWhereILike('maternal_surname', `%${search}%`)
              break
            case 'all':
            default:
              q.whereILike('citizen_id', `%${search}%`).orWhereILike('names', `%${search}%`)
              break
          }
        })
      }

      switch (status) {
        case 'deleted':
          query.whereNotNull('deleted_at')
          break
        case 'available':
          query.whereNull('deleted_at')
          break
        case 'all':
          break
      }

      query.orderBy(orderBy, orderDir)
      const teachers = await query.paginate(page, limit)
      teachers.baseUrl(request.url())

      return response.ok(teachers)
    } catch (error) {
      return response.internalServerError({
        message: 'Error fetching teachers',
        error: error.message,
      })
    }
  }
}
