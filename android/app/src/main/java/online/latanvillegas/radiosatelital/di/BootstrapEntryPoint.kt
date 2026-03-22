package online.latanvillegas.radiosatelital.di

import dagger.hilt.EntryPoint
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import online.latanvillegas.radiosatelital.data.local.LocalStationDataSource
import online.latanvillegas.radiosatelital.domain.usecases.SeedDefaultStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.SyncStationsUseCase

/**
 * Hilt EntryPoint para acceso a dependencias de bootstrap sin depender de AppContainer.
 * Se utiliza en RadioSatelitalApplication durante la inicialización de la aplicación.
 *
 * Utiliza @EntryPoint para permitir la inyección manual en Application (que no es una clase
 * administrada por Hilt para inyección de campos).
 */
@EntryPoint
@InstallIn(SingletonComponent::class)
interface BootstrapEntryPoint {
    fun syncStationsUseCase(): SyncStationsUseCase
    fun seedDefaultStationsUseCase(): SeedDefaultStationsUseCase
    fun localStationDataSource(): LocalStationDataSource
}
