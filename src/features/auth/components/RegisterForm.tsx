import {
    Alert,
    Anchor,
    Button,
    Card,
    NumberInput,
    PasswordInput,
    SegmentedControl,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import {ChangeEvent, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AppRoutes} from '../../../app/router/AppRoutes'
import {UserRole} from '../../../entities'
import {useSignUpMutation} from "../../../shared/api";
import {setAuth} from "../../../app/slices/authSlice.ts";
import {useDispatch} from "react-redux";

const RegisterForm = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState<UserRole.PARENT | UserRole.COURSE_CREATOR | UserRole.STUDENT>(UserRole.PARENT)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState<number>(14)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [localError, setLocalError] = useState<string | null>(null)

    const [signUp, signUpState] = useSignUpMutation()

    const isLoading = signUpState.isLoading
    const apiError = getErrorMessage(signUpState.error)

    const dispatch = useDispatch()

    const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLocalError(null)

        if (password !== confirmPassword) {
            setLocalError('Пароли не совпадают')
            return
        }

        if (role === UserRole.STUDENT) {
            if (age < 14) {
                setLocalError('Регистрация ребенка доступна только с 14 лет')
                return
            }
        }
        const response = await signUp({
            fullName,
            email,
            password,
            role: UserRole.STUDENT,
            age,
        }).unwrap()
        if (response.user !== undefined) {
            dispatch(setAuth(response.user))
            navigate(AppRoutes.HOME)
        }
    }

    return (
        <Card w={500} withBorder shadow="md" radius="xl" padding="xl">
            <Title order={2} ta="center" mb="md">
                Регистрация
            </Title>

            <form onSubmit={onSubmit}>
                <Stack gap="md">
                    <SegmentedControl
                        value={role}
                        onChange={value => setRole(value as UserRole.PARENT | UserRole.COURSE_CREATOR | UserRole.STUDENT)}
                        data={[
                            {value: UserRole.PARENT, label: 'Родитель'},
                            {value: UserRole.COURSE_CREATOR, label: 'Создатель курса'},
                            {value: UserRole.STUDENT, label: 'Ребенок'},
                        ]}
                    />

                    <TextInput
                        label="ФИО"
                        value={fullName}
                        onChange={event => setFullName(event.currentTarget.value)}
                        required
                    />

                    <TextInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.currentTarget.value)}
                        required
                    />

                    {role === UserRole.STUDENT && (
                        <NumberInput
                            label="Возраст"
                            min={14}
                            max={99}
                            value={age}
                            onChange={value => setAge(Number(value))}
                            required
                        />
                    )}

                    <PasswordInput
                        label="Пароль"
                        value={password}
                        onChange={event => setPassword(event.currentTarget.value)}
                        required
                    />

                    <PasswordInput
                        label="Повторите пароль"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.currentTarget.value)}
                        required
                    />

                    {(localError || apiError) && <Alert color="red">{localError ?? apiError}</Alert>}

                    <Button type="submit" loading={isLoading} fullWidth>
                        Создать аккаунт
                    </Button>

                    <Anchor component={Link} to={AppRoutes.LOGIN} ta="center">
                        Уже есть аккаунт? Войти
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

    return 'Ошибка регистрации'
}

export default RegisterForm
