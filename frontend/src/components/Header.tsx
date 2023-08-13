import './Header.css'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

type Props = {
    user?: string,
    onLogout: () => void
}
export default function Header(props: Props) {
    const navigate = useNavigate();

    const isAuthenticated = props.user !== undefined && props.user !== "anonymousUser";

    return (
        <header>
            <nav style={{
                width: "100%",
                height: "2rem",
                background: "black",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <b style={{
                    fontSize: "17px", color: "white",
                    padding: "10px"
                }}>Paw Palace Parties</b>
                <p style={{color: "white", marginLeft: "auto"}}>{isAuthenticated ? props.user : "😺"}</p>
                {!isAuthenticated ?
                    <> <Button sx={{m: "0.5rem", p: "0.5rem", fontSize: "10px"}} className="button-login" variant="contained"
                               color="inherit"
                               disableElevation
                               onClick={() => navigate("/login")}>
                        Login
                    </Button>
                        <p style={{color: "white"}}>or</p>
                        <Button sx={{m: "0.5rem", p: "0.5rem", fontSize: "10px"}} className="button-login" variant="contained"
                                color="inherit"
                                disableElevation
                                onClick={() => navigate("/register")}>
                            Sign up
                        </Button> </> :
                    <Button sx={{m: "1rem", p: "0.5rem", fontSize: "10px"}} className="button-login" variant="contained" color="inherit"
                            disableElevation
                            onClick={props.onLogout}>
                        Logout
                    </Button>}
            </nav>
        </header>
    )
}