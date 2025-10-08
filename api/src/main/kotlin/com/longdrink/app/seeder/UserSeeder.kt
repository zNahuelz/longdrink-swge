package com.longdrink.app.seeder

import com.longdrink.app.model.Employee
import com.longdrink.app.model.Student
import com.longdrink.app.model.Teacher
import com.longdrink.app.model.User
import com.longdrink.app.repository.*
import jakarta.transaction.Transactional
import org.springframework.core.annotation.Order
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
@Order(2)
class UserSeeder(
    private val userRepository: UserRepository,
    private val teacherRepository: TeacherRepository,
    private val studentRepository: StudentRepository,
    private val employeeRepository: EmployeeRepository,
    private val roleRepository: RoleRepository
) : Seeder {

    private val encoder = BCryptPasswordEncoder()

    @Transactional
    override fun run() {
        val adminRole = roleRepository.findByName("ADMINISTRADOR")!!
        val teacherRole = roleRepository.findByName("DOCENTE")!!
        val studentRole = roleRepository.findByName("ALUMNO")!!
        val receptionistRole = roleRepository.findByName("SECRETARIA")!!

        if (employeeRepository.findByCitizenId("00000001") == null) {
            val employee = employeeRepository.save(
                Employee(
                    names = "ADMINISTRADOR",
                    paternalSurname = "-----",
                    maternalSurname = "-----",
                    citizenId = "00000001",
                    citizenIdType = "DNI",
                    phone = "999999999",
                    address = "-----",
                    birthDate = LocalDate.of(2000, 1, 1),
                    hiringDate = LocalDate.now(),
                    position = "GERENTE"
                )
            )
            userRepository.save(
                User(
                    username = "admin",
                    email = "admin@longdrink.com",
                    password = encoder.encode("admin"),
                    role = adminRole
                )
            )
            println("[DB - SEEDER] Usuario administrador creado.")
        }

        if (teacherRepository.findByCitizenId("01122334") == null) {
            val teacher = teacherRepository.save(
                Teacher(
                    names = "JUAN",
                    paternalSurname = "JIMENEZ",
                    maternalSurname = "SANCHEZ",
                    citizenId = "01122334",
                    citizenIdType = "DNI",
                    phone = "999888777",
                    address = "Aija 4900 - Los Olivos",
                    birthDate = LocalDate.of(1990, 5, 20),
                    hiringDate = LocalDate.now(),
                    dismissalDate = null,
                )
            )
            userRepository.save(
                User(
                    username = "teacher",
                    email = "teacher@longdrink.com",
                    password = encoder.encode("teacher"),
                    role = teacherRole,
                    teacher = teacher
                )
            )
            println("[DB - SEEDER] Usuario docente creado.")
        }

        if (studentRepository.findByCitizenId("02233445") == null) {
            val student = studentRepository.save(
                Student(
                    names = "FRANCISCA",
                    paternalSurname = "GARCIA",
                    maternalSurname = "PEREZ",
                    citizenId = "02233445",
                    citizenIdType = "DNI",
                    phone = "555666777",
                    address = "Av. El Trebol 334",
                    birthDate = LocalDate.of(2003, 5, 16),
                )
            )
            userRepository.save(
                User(
                    username = "student",
                    email = "student@longdrink.com",
                    password = encoder.encode("student"),
                    role = studentRole,
                    student = student
                )
            )
            println("[DB - SEEDER] Usuario estudiante creado.")
        }

        if (employeeRepository.findByCitizenId("03344556") == null) {
            val employee = employeeRepository.save(
                Employee(
                    names = "ALEJANDRA",
                    paternalSurname = "SUAREZ",
                    maternalSurname = "MALAVER",
                    citizenId = "03344556",
                    citizenIdType = "DNI",
                    phone = "111222333",
                    address = "Av. Globo Terraqueo 103",
                    birthDate = LocalDate.of(1999, 3, 14),
                    hiringDate = LocalDate.now(),
                    dismissalDate = null,
                    position = "SECRETARIA",
                )
            )
            userRepository.save(
                User(
                    username = "receptionist",
                    email = "receptionist@longdrink.com",
                    password = encoder.encode("receptionist"),
                    role = receptionistRole,
                    employee = employee
                )
            )
            println("[DB - SEEDER] Usuario secretaria creado.")
        }
    }
}