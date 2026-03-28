import { useMemo } from 'react'
import { Accordion, Button, Stack, Text } from '@mantine/core'
import { BookOpen, Code2, HelpCircle } from 'lucide-react'
import type { CourseStepType } from '../../../entities'
import type { FlatStepItem } from '../model/flattenCourse'

type Props = {
    flat: FlatStepItem[]
    currentStepId: string
    completedSteps: Record<string, boolean>
    onSelectStep: (stepId: string) => void
}

const stepIcon = (type: CourseStepType) => {
    switch (type) {
        case 'lesson':
            return BookOpen
        case 'test':
            return HelpCircle
        case 'code':
            return Code2
        default:
            return BookOpen
    }
}

export const CourseLearnSidebar = ({ flat, currentStepId, completedSteps, onSelectStep }: Props) => {
    const groups = useMemo(() => {
        const map = new Map<string, { title: string; order: number; items: FlatStepItem[] }>()
        for (const item of flat) {
            let g = map.get(item.moduleId)
            if (!g) {
                g = { title: item.moduleTitle, order: item.moduleOrder, items: [] }
                map.set(item.moduleId, g)
            }
            g.items.push(item)
        }
        return [...map.entries()]
            .sort((a, b) => a[1].order - b[1].order)
            .map(([moduleId, g]) => ({ moduleId, ...g }))
    }, [flat])

    const defaultModule = groups[0]?.moduleId

    return (
        <Accordion defaultValue={defaultModule} variant="separated" radius="md">
            {groups.map(g => (
                <Accordion.Item key={g.moduleId} value={g.moduleId}>
                    <Accordion.Control>
                        <Text fw={800} fz="sm">
                            {g.title}
                        </Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={6}>
                            {g.items.map(item => {
                                const Icon = stepIcon(item.step.type)
                                const active = item.step.id === currentStepId
                                const passed = completedSteps[item.step.id]
                                return (
                                    <Button
                                        key={item.step.id}
                                        variant={active ? 'filled' : 'light'}
                                        color={active ? 'violet' : 'gray'}
                                        justify="flex-start"
                                        leftSection={<Icon size={18} />}
                                        onClick={() => onSelectStep(item.step.id)}
                                        fullWidth
                                        radius="md"
                                        rightSection={
                                            passed ? (
                                                <Text span fz="sm" fw={800}>
                                                    ✓
                                                </Text>
                                            ) : null
                                        }
                                        styles={{
                                            inner: { justifyContent: 'flex-start' },
                                            label: { textAlign: 'left', whiteSpace: 'normal' },
                                        }}
                                    >
                                        {item.step.title}
                                    </Button>
                                )
                            })}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
