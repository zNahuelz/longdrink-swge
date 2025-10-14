package com.longdrink.app.config

import com.longdrink.app.seeder.Seeder
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class DatabaseSeederRunner(
    private val seeders: List<Seeder>
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        println("[SeederRunner] Iniciando llenado de base de datos...")

        seeders.forEach { seeder ->
            println("[SeederRunner] Ejecutando: ${seeder::class.simpleName}")
            seeder.run()
        }

        println("[SeederRunner] Seeders ejecutados correctamente.")
    }
}