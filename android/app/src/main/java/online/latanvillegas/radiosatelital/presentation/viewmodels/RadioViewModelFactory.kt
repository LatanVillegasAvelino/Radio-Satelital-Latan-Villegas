package online.latanvillegas.radiosatelital.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import online.latanvillegas.radiosatelital.domain.usecases.GetFavoriteStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ObserveStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.SearchStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ToggleFavoriteUseCase

/**
 * Factory DEPRECADA: RadioViewModel ahora usa @HiltViewModel para inyección automática.
 * Este archivo se mantiene solo para compatibilidad hacia atrás.
 * TODO: Eliminar en próxima versión.
 */
@Deprecated("Use @HiltViewModel on RadioViewModel instead. This factory is no longer needed.")
class RadioViewModelFactory(
    private val observeStationsUseCase: ObserveStationsUseCase,
    private val getFavoriteStationsUseCase: GetFavoriteStationsUseCase,
    private val searchStationsUseCase: SearchStationsUseCase,
    private val toggleFavoriteUseCase: ToggleFavoriteUseCase
) : ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(RadioViewModel::class.java)) {
            return RadioViewModel(
                observeStationsUseCase = observeStationsUseCase,
                getFavoriteStationsUseCase = getFavoriteStationsUseCase,
                searchStationsUseCase = searchStationsUseCase,
                toggleFavoriteUseCase = toggleFavoriteUseCase
            ) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
    }
}
