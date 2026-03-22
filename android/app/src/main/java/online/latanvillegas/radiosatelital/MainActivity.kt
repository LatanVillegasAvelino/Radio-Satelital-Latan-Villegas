package online.latanvillegas.radiosatelital

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import dagger.hilt.android.AndroidEntryPoint
import online.latanvillegas.radiosatelital.presentation.screens.RadioScreen
import online.latanvillegas.radiosatelital.presentation.viewmodels.RadioViewModel

/**
 * Activity principal de la aplicación.
 * Usa Hilt para inyectar automáticamente RadioViewModel mediante @HiltViewModel.
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
  // Hilt inyecta automáticamente RadioViewModel - no requiere factory manual
  private val radioViewModel: RadioViewModel by viewModels()

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    setContent {
      MaterialTheme {
        Surface(color = MaterialTheme.colorScheme.background) {
          RadioScreen(viewModel = radioViewModel)
        }
      }
    }
  }
}
