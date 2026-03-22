package online.latanvillegas.radiosatelital.presentation.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import online.latanvillegas.radiosatelital.domain.models.Station
import online.latanvillegas.radiosatelital.domain.usecases.GetFavoriteStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ObserveStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.SearchStationsUseCase
import online.latanvillegas.radiosatelital.domain.usecases.ToggleFavoriteUseCase
import javax.inject.Inject

/**
 * Estado de la interfaz de usuario para la pantalla de radio.
 * Estado inmutable para renderizado predecible en Compose.
 */
data class RadioUiState(
    val isLoading: Boolean = false,
    val stations: List<Station> = emptyList(),
    val currentStation: Station? = null,
    val isPlaying: Boolean = false,
    val errorMessage: String? = null,
    val searchQuery: String = "",
    val isFavoritesOnly: Boolean = false
)

/**
 * ViewModel para gestionar la lógica de la pantalla de radio.
 * Proporciona una fuente única de verdad (UiState) mediante StateFlow.
 * Inyectado automáticamente por Hilt, reemplaza RadioViewModelFactory.
 */
@HiltViewModel
class RadioViewModel @Inject constructor(
    private val observeStationsUseCase: ObserveStationsUseCase,
    private val getFavoriteStationsUseCase: GetFavoriteStationsUseCase,
    private val searchStationsUseCase: SearchStationsUseCase,
    private val toggleFavoriteUseCase: ToggleFavoriteUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow(RadioUiState())
    val uiState: StateFlow<RadioUiState> = _uiState.asStateFlow()

    /**
     * Carga todas las estaciones desde el repositorio.
     * Observa cambios reactivos del stream de datos.
     */
    private fun loadStations() {
        viewModelScope.launch {
            updateState { it.copy(isLoading = true) }
            try {
                observeStationsUseCase().collect { stations ->
                    updateState {
                        it.copy(
                            stations = stations,
                            isLoading = false,
                            errorMessage = null
                        )
                    }
                }
            } catch (e: Exception) {
                updateState {
                    it.copy(
                        isLoading = false,
                        errorMessage = e.message ?: "Error cargando estaciones"
                    )
                }
            }
        }
    }


    init {
        loadStations()
    }

    /**
     * Helper interno para actualizar el estado de forma consistente.
     */
    private fun updateState(reducer: (RadioUiState) -> RadioUiState) {
        _uiState.value = reducer(_uiState.value)
    }

    /**
     * Reproduce una estación seleccionada y la marca como actual.
     */
    fun playStation(station: Station) {
        viewModelScope.launch {
            try {
                updateState {
                    it.copy(
                        currentStation = station,
                        isPlaying = true,
                        errorMessage = null
                    )
                }
                // TODO: Integración con RadioForegroundService para reproducción real
            } catch (e: Exception) {
                updateState {
                    it.copy(
                        isPlaying = false,
                        errorMessage = e.message ?: "Error reproduciendo estación"
                    )
                }
            }
        }
    }

    /**
     * Pausa la reproducción actual.
     */
    fun pauseStation() {
        updateState { it.copy(isPlaying = false) }
    }

    /**
     * Busca estaciones por consulta de texto.
     * Actualiza la lista filtrada sin modificar la lista original.
     */
    fun searchStations(query: String) {
        viewModelScope.launch {
            updateState {
                it.copy(
                    searchQuery = query,
                    isLoading = true
                )
            }
            try {
                searchStationsUseCase(query)
                    .onSuccess { results ->
                        updateState {
                            it.copy(
                                stations = results,
                                isLoading = false,
                                errorMessage = null
                            )
                        }
                    }
                    .onFailure { throwable ->
                        updateState {
                            it.copy(
                                isLoading = false,
                                errorMessage = throwable.message ?: "Error buscando estaciones"
                            )
                        }
                    }
            } catch (e: Exception) {
                updateState {
                    it.copy(
                        isLoading = false,
                        errorMessage = e.message ?: "Error desconocido"
                    )
                }
            }
        }
    }

    /**
     * Alterna el estado de favorito de una estación.
     */
    fun toggleFavorite(stationId: String) {
        viewModelScope.launch {
            try {
                val station = _uiState.value.stations.find { it.id == stationId }
                if (station != null) {
                    val newFavoriteState = !station.isFavorite
                    toggleFavoriteUseCase(stationId, newFavoriteState)
                    // El estado se actualizará mediante observeStationsUseCase
                }
            } catch (e: Exception) {
                updateState {
                    it.copy(
                        errorMessage = e.message ?: "Error actualizando favorito"
                    )
                }
            }
        }
    }

    /**
     * Carga y muestra solo las estaciones favoritas.
     */
    fun showFavoritesOnly(favoritesOnly: Boolean) {
        viewModelScope.launch {
            updateState { it.copy(isFavoritesOnly = favoritesOnly) }
            if (favoritesOnly) {
                updateState { it.copy(isLoading = true) }
                try {
                    getFavoriteStationsUseCase().collect { favorites ->
                        updateState {
                            it.copy(
                                stations = favorites,
                                isLoading = false,
                                errorMessage = null
                            )
                        }
                    }
                } catch (e: Exception) {
                    updateState {
                        it.copy(
                            isLoading = false,
                            errorMessage = e.message ?: "Error cargando favoritos"
                        )
                    }
                }
            } else {
                // Recarga todas las estaciones
                loadStations()
            }
        }
    }

    /**
     * Limpia el mensaje de error actual.
     */
    fun clearError() {
        updateState { it.copy(errorMessage = null) }
    }
}
