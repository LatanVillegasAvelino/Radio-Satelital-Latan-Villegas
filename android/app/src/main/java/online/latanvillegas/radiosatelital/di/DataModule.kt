package online.latanvillegas.radiosatelital.di

import android.content.Context
import androidx.room.Room
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import online.latanvillegas.radiosatelital.data.local.LocalStationDataSource
import online.latanvillegas.radiosatelital.data.local.RoomLocalStationDataSource
import online.latanvillegas.radiosatelital.data.local.db.AppDatabase
import online.latanvillegas.radiosatelital.data.remote.RemoteStationDataSource
import online.latanvillegas.radiosatelital.data.repositories.StationRepositoryImpl
import online.latanvillegas.radiosatelital.domain.repositories.StationRepository
import javax.inject.Singleton

/**
 * Hilt module para inyectar dependencias de data layer.
 * Proporciona: Room DB, DAOs, LocalDataSource, Repository.
 */
@Module
@InstallIn(SingletonComponent::class)
object DataModule {

    @Provides
    @Singleton
    fun provideAppDatabase(
        @ApplicationContext context: Context
    ): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "radio_satelital.db"
        ).fallbackToDestructiveMigration().build()
    }

    @Provides
    @Singleton
    fun provideLocalStationDataSource(
        appDatabase: AppDatabase
    ): LocalStationDataSource {
        return RoomLocalStationDataSource(appDatabase.stationDao())
    }

    @Provides
    @Singleton
    fun provideStationRepository(
        localStationDataSource: LocalStationDataSource,
        remoteStationDataSource: RemoteStationDataSource
    ): StationRepository {
        return StationRepositoryImpl(
            localDataSource = localStationDataSource,
            remoteDataSource = remoteStationDataSource
        )
    }
}
