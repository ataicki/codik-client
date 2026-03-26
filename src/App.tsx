import {AppRouter} from "./app/router";
import {ThemeProvider} from "./app/providers";

function App() {

    return (
        <ThemeProvider>
        <AppRouter/>
        </ThemeProvider>
    )
}

export default App
