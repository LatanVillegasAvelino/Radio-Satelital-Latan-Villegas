package online.latanvillegas.radiosatelital.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import online.latanvillegas.radiosatelital.data.remote.FakeRemoteStationDataSource
import online.latanvillegas.radiosatelital.data.remote.RemoteStationDataSource
import online.latanvillegas.radiosatelital.data.remote.SupabaseRemoteStationDataSource
import online.latanvillegas.radiosatelital.BuildConfig
import javax.inject.Singleton

/**
 * Hilt module para inyectar RemoteDataSource.
 * Decide entre Supabase real o fake según BuildConfig.
 */
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideRemoteDataSource(): RemoteStationDataSource {
        val supabaseUrl = BuildConfig.SUPABASE_URL
        val supabaseAnonKey = BuildConfig.SUPABASE_ANON_KEY

        return if (supabaseUrl.isNotBlank() && supabaseAnonKey.isNotBlank()) {
            SupabaseRemoteStationDataSource(
                supabaseUrl = supabaseUrl,
                supabaseAnonKey = supabaseAnonKey
            )
        } else {
            FakeRemoteStationDataSource()
        }
    }
}
