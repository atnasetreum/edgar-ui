import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "components/ui";
import { SelectUsers } from "components/login";
import { UserLogin } from "ts/interfaces";
import { AuthContext } from "contexts/auth";
import { useNotify } from "hooks";
import { useRouter } from "next/router";

const theme = createTheme();

function Login() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserLogin | null>(null);
  const [password, setPassword] = React.useState<string>("");
  const { loginUser, isLoggedIn } = React.useContext(AuthContext);
  const { notify } = useNotify();
  const router = useRouter();

  const btnDisabled = React.useMemo(
    () => !user || !password?.trim() || loading,
    [user, password, loading]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      setLoading(true);
      const { isLoggedIn } = await loginUser(user.id, password.trim());
      setLoading(false);
      if (!isLoggedIn) {
        return notify("Credenciales no validas");
      }
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [notify, isLoggedIn, router]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            MADALU Food & Drinks.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <SelectUsers user={user} setUser={setUser} />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={btnDisabled}
            >
              Inciar Session
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;
