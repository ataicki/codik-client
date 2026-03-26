import { MantineProvider, createTheme, MantineThemeOverride } from '@mantine/core'
import { PropsWithChildren } from 'react'

const getVar = (name: string, fallback: string) => {
    if (typeof window === 'undefined') return fallback
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const createColor = (value: string) =>
    Array.from({ length: 10 }, () => value) as [
        string, string, string, string, string,
        string, string, string, string, string
    ]

const buildTheme = (): MantineThemeOverride => ({
    fontFamily: 'Inter, system-ui, sans-serif',

    primaryColor: 'violet',
    primaryShade: { light: 6, dark: 8 },

    defaultRadius: 'md',

    radius: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: getVar('--radius', '1rem'),
        lg: '1.25rem',
        xl: '1.5rem',
    },

    colors: {
        violet: createColor(getVar('--primary', 'hsl(263 85% 62%)')),

        kidBlue: createColor(getVar('--kid-blue', 'hsl(197 90% 58%)')),
        kidGreen: createColor(getVar('--kid-green', 'hsl(140 80% 55%)')),
        kidPink: createColor(getVar('--kid-pink', 'hsl(330 85% 65%)')),
        kidYellow: createColor(getVar('--kid-yellow', 'hsl(48 95% 58%)')),

        success: createColor(getVar('--success', 'hsl(140 80% 55%)')),
        warning: createColor(getVar('--warning', 'hsl(38 95% 58%)')),
        red: createColor(getVar('--destructive', 'hsl(0 84% 65%)')),
    },

    autoContrast: true,

    components: {
        Button: {
            defaultProps: {
                radius: 'xl',
                size: 'md',
            },
            styles: {
                root: {
                    fontWeight: 600,
                    boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
                    transition: 'all 0.15s ease',
                },
            },
        },

        Card: {
            defaultProps: {
                radius: 'xl',
                shadow: 'sm',
            },
        },

        Paper: {
            defaultProps: {
                radius: 'xl',
            },
        },

        Input: {
            defaultProps: {
                radius: 'md',
            },
        },
    },
})

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider
            theme={createTheme(buildTheme())}
            defaultColorScheme="light"
        >
            {children}
        </MantineProvider>
    )
}
