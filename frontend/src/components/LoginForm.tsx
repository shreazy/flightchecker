import Button from "@mui/material/Button";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type Props = {
    onLogin: (username: string, password: string) => void
}

export default function LoginForm(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        props.onLogin(username, password);
        navigate("/");
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '28px' }}>Pilot Login</legend>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: 0, }}>
                        <FormControl sx={{ width: '100%', margin: "0px", }} variant="outlined">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                label="Username"
                                sx={{ width: '100%', margin: "auto" }}
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginTop: "30px", }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                sx={{ width: '100%', margin: "auto" }}
                            />
                        </FormControl>
                    </div>
                    <div style={{ margin: 0, }}>
                        <Button sx={{ mt: 3, color: "rgb(44, 161, 173)", borderColor: "rgb(44, 161, 173)" }}
                                variant="outlined" disableElevation
                                onClick={() => navigate("/")}> Cancel</Button>

                        <Button sx={{ mt: 3, bgcolor: "rgb(44, 161, 173)" }} type="submit" variant="contained"
                                className="button-right">
                            Login
                        </Button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}
