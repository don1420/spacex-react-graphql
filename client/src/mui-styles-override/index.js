import { createTheme } from '@mui/material/styles';
import {grey, orange} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        info: {
            main: orange[700]
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: grey[300],
                    backgroundColor: grey[900],
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: grey[300],
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    color: grey[300],
                    backgroundColor: grey[900],
                    borderStyle: "none"
                }
            }
        }
    }
});