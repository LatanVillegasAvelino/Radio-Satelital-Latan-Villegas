package online.latanvillegas.radiosatelital.di

import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewModelComponent

/**
 * Hilt module para inyectar dependencias de presentation layer (ViewModels).
 * Los ViewModels que usan @HiltViewModel se inyectan automáticamente.
 * Este módulo está disponible para futuras extensiones de ViewModels.
 */
@Module
@InstallIn(ViewModelComponent::class)
object PresentationModule {
    // Los ViewModels se inyectan automáticamente via @HiltViewModel
    // No se requieren @Provides aquí; Hilt genera el factory automáticamente
}
