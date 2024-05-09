export interface User {
    id: string;
    full_name: string;
    role: string;
    email: string;
    password: string;
    enrolled_courses: CourseInfo[];
}

export interface CourseInfo {
    course_id: string;
    course_name: string;
    completed: number;
}