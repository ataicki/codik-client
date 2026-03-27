import type {CourseDraft} from "../../../../entities";

export type UpdateDraftImmer = (updater: (state: CourseDraft) => void) => void
