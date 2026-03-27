import {
    Alert,
    Anchor,
    Button,
    Card,
    Center,
    NumberInput,
    PasswordInput,
    SegmentedControl,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import {FormEvent, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AppRoutes} from '../../../app/router/AppRoutes'
import {UserRole} from '../../../entities'
import {
    useRegisterCourseCreatorMutation,
    useRegisterKidMutation,
    useRegisterParentMutation,
} from '../../../shared/api'

const RegisterForm = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState<UserRole.Parent | UserRole.CourseCreator | UserRole.Kid>(UserRole.Parent)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState<number>(14)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [localError, setLocalError] = useState<string | null>(null)

    const [registerParent, parentState] = useRegisterParentMutation()
    const [registerCourseCreator, creatorState] = useRegisterCourseCreatorMutation()
    const [registerKid, kidState] = useRegisterKidMutation()

    const isLoading = parentState.isLoading || creatorState.isLoading || kidState.isLoading
    const apiError = getErrorMessage(parentState.error ?? creatorState.error ?? kidState.error)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLocalError(null)

        if (password !== confirmPassword) {
            setLocalError('Пароли не совпадают')
            return
        }

        if (role === UserRole.Parent) {
            await registerParent({fullName, email, password, role: UserRole.Parent}).unwrap()
        }

        if (role === UserRole.CourseCreator) {
            await registerCourseCreator({
                fullName,
                email,
                password,
                role: UserRole.CourseCreator,
            }).unwrap()
        }

        if (role === UserRole.Kid) {
            if (age < 14) {
                setLocalError('Регистрация ребенка доступна только с 14 лет')
                return
            }

            await registerKid({
                fullName,
                email,
                password,
                role: UserRole.Kid,
                age,
            }).unwrap()
        }

        navigate(AppRoutes.HOME)
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
                        onChange={value => setRole(value as UserRole.Parent | UserRole.CourseCreator | UserRole.Kid)}
                        data={[
                            {value: UserRole.Parent, label: 'Родитель'},
                            {value: UserRole.CourseCreator, label: 'Создатель курса'},
                            {value: UserRole.Kid, label: 'Ребенок'},
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

                    {role === UserRole.Kid && (
                        <NumberInput
                            label="Возраст"
                            min={14}
                            max={99}
                            value={age}
                            onChange={value => setAge(value)}
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
