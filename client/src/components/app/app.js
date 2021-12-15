import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {theme} from "../../mui-styles-override";
import { HomePage, LaunchDetailsPage, NotFoundPage } from "../pages";
import Header from "../header";
import './app.scss';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={ <HomePage /> } />
                        <Route path="launch/:flightNumber" element={ <LaunchDetailsPage/> } />
                        <Route path="*" element={ <NotFoundPage/> }/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
