import { produce } from 'immer'
import type { CourseDraft } from '../../../../entities'

export const normalizeDraftOrders = (draft: CourseDraft): CourseDraft =>
    produce(draft, d => {
        d.modules.forEach((module, moduleIndex) => {
            module.order = moduleIndex + 1
            module.steps.forEach((step, stepIndex) => {
                step.order = stepIndex + 1
            })
        })
    })
