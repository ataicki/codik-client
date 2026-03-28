export { UserRole } from './enums/UserRole'

export type {
    LoginRequestDto,
    RegisterRequestDto,
    LogoutResponseDto,
    UserResponseDto
} from './auth/AuthDtos'

export type {
    ParentProfileDto,
    ParentKidProgressDto,
    ParentKidCourseSummaryDto,
    ParentKidCompletedCourseDto,
} from './profile/ParentProfile'

// export type {
//     StepType,
//     CourseDraft,
//     CourseStep,
//     CourseModule,
//     CourseTestOption,
//     CourseTestQuestion,
//     CourseCodeExercise,
//     CreateCourseDraftRequest,
//     UpdateCourseDraftRequest,
// } from './course/CourseCreatorModels'

export type {
    CourseStatus,
    CourseImage,
    CourseCreator,
    LessonRef,
    TestRef,
    Step,
    Module,
    CourseListItem,
    CourseDetail,
    Enrollment,
    Progress,
    UploadImageResponse,
    CreateCourseRequest,
    UpdateCourseRequest
} from './course/CourseModels.ts'

export type {
    CourseModule ,
    CreateModuleRequest ,
    UpdateModuleRequest ,
    ReorderModuleRequest ,
    StepRef,
} from './module/ModuleModels.ts'

export type {
    StudentCourseListItem,
    StudentLastCompleted,
    StudentHomeResponse,
} from './student/StudentHome'

export type {
    CourseDraft,
    CourseStep,
    CourseStepType,
    CourseLearnModule,
    CourseTestOption,
    CourseTestQuestion,
    CourseCodeExercise,
} from './student/CourseLearn'

export type {Profile, UpdateProfileRequest} from './profile/ProfileModels'

export type { Lesson, CreateLessonRequest, UpdateLessonRequest } from './lesson/LessonModels'

export type { CreateStepRequest, ReorderStepRequest } from './step/StepModels'
