import Button from "@mui/material/Button";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput,} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


type Props = {
    onRegister: (username: string, password: string) => void
    onLogin: (username: string, password: string) => void
}

export default function RegisterForm(props: Props) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");

    const navigate = useNavigate()

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        props.onRegister(username, password)
        navigate("/")
    }

    function changeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
        if (event.target.value.includes(" ")) {
            setErrorUsername("Whitespace is not allowed!")
        } else if (event.target.value.length < 3) {
            setErrorUsername("Username must be at least 3 characters long!")
        } else if (event.target.value.length > 25) {
            setErrorUsername("Username must be under 25 characters long!")
        } else {
            setErrorUsername("")
        }
    }


    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
        if (event.target.value.length < 3) {
            setErrorPassword("Password must be at least 3 characters long!")
        } else if (event.target.value.length > 25) {
            setErrorPassword("Password must be under 25 characters long!")
        } else {
            setErrorPassword("")
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (<>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend style={{marginBottom: '20px', fontWeight: 'bold', fontSize: '28px'}}>Register</legend>
                    <div style={{display: 'flex', flexDirection: 'column', margin: 0,}}>

                        <FormControl sx={{width: '100%', margin: "0px",}} variant="outlined"
                                     error={errorUsername.length > 0}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                type="text"
                                value={username}
                                id="username"
                                onChange={changeUsername}
                                label="Username"
                                sx={{width: '100%', margin: "auto"}}
                            />
                            {errorUsername && <FormHelperText error>{errorUsername}</FormHelperText>}
                        </FormControl>
                        <FormControl sx={{width: '100%', marginTop: "30px",}} variant="outlined"
                                     error={errorPassword.length > 0}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={changePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                sx={{width: '100%', margin: "auto"}}
                            />
                            {errorPassword && <FormHelperText error>{errorPassword}</FormHelperText>}
                        </FormControl>
                    </div>
                    <div style={{margin: 0,}}>
                        <Button sx={{mt: 3, color: "rgb(44, 161, 173)", borderColor: "rgb(44, 161, 173)"}}
                                variant="outlined" disableElevation
                                onClick={() => navigate("/")}> Cancel</Button>

                        <Button sx={{mt: 3, bgcolor: "rgb(44, 161, 173)"}} type="submit" variant="contained"
                                className="button-right">
                            Sign up
                        </Button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}