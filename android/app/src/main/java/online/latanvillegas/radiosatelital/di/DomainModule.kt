package online.latanvillegas.radiosatelital.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import online.latanvillegas.radiosatelital.domain.repositories.StationRepository
import online.latanvillegas.radiosatelital.domain.usecases.GetFavoriteStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ObserveStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.PlayStationUseCase
import online.latanvillegas.radiosatelital.domain.usecases.SearchStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.SeedDefaultStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.SyncStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ToggleFavoriteUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ValidateStreamUseCase
import javax.inject.Singleton

/**
 * Hilt module para inyectar dependencias de domain layer (UseCases).
 */
@Module
@InstallIn(SingletonComponent::class)
object DomainModule {

    @Provides
    @Singleton
    fun providePlayStationUseCase(
        stationRepository: StationRepository
    ): PlayStationUseCase {
        return PlayStationUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideObserveStationsUseCase(
        stationRepository: StationRepository
    ): ObserveStationsUseCase {
        return ObserveStationsUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideGetFavoriteStationsUseCase(
        stationRepository: StationRepository
    ): GetFavoriteStationsUseCase {
        return GetFavoriteStationsUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideValidateStreamUseCase(
        stationRepository: StationRepository
    ): ValidateStreamUseCase {
        return ValidateStreamUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideSearchStationsUseCase(
        stationRepository: StationRepository
    ): SearchStationsUseCase {
        return SearchStationsUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideToggleFavoriteUseCase(
        stationRepository: StationRepository
    ): ToggleFavoriteUseCase {
        return ToggleFavoriteUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideSyncStationsUseCase(
        stationRepository: StationRepository
    ): SyncStationsUseCase {
        return SyncStationsUseCase(stationRepository)
    }

    @Provides
    @Singleton
    fun provideSeedDefaultStationsUseCase(
        stationRepository: StationRepository
    ): SeedDefaultStationsUseCase {
        return SeedDefaultStationsUseCase(stationRepository)
    }
}
