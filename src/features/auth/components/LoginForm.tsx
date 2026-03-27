import {
    Alert,
    Anchor,
    Button,
    Card,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import {ChangeEvent, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AppRoutes} from '../../../app/router/AppRoutes'
import {useLoginMutation} from '../../../shared/api'

const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, loginState] = useLoginMutation()

    const isLoading = loginState.isLoading
    const errorMessage = getErrorMessage(loginState.error)

    const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const response = await login({email, password})
        if (response.data !== undefined)
            navigate(AppRoutes.HOME)
    }

    return (
        <Card w={430} withBorder shadow="md" radius="xl" padding="xl">
            <Title order={2} ta="center" mb="md">
                Вход в Codik
            </Title>

            <form onSubmit={onSubmit}>
                <Stack gap="md">
                    <TextInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.currentTarget.value)}
                        required
                    />

                    <PasswordInput
                        label="Пароль"
                        value={password}
                        onChange={event => setPassword(event.currentTarget.value)}
                        required
                    />

                    {errorMessage && <Alert color="red">{errorMessage}</Alert>}

                    <Button type="submit" loading={isLoading} fullWidth>
                        Войти
                    </Button>

                    <Anchor component={Link} to={AppRoutes.REGISTER} ta="center">
                        Нет аккаунта? Зарегистрироваться
                    </Anchor>
                </Stack>
            </form>
        </Card>
    )
}

const getErrorMessage = (error: unknown): string | null => {
    if (!error || typeof error !== 'object') {
        return null
    }

    if ('message' in error && typeof error.message === 'string') {
        return error.message
    }

    return 'Ошибка авторизации'
}

export default LoginForm
