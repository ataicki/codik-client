import { Provider } from 'react-redux'
import { AppRouter } from './app/router'
import { ThemeProvider } from './app/providers'
import { store } from './app/store/store'
import './global.css'

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </Provider>
    )
}

export default App
