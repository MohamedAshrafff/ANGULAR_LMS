export interface Course {
    id: string;
    course_id: string;
    course_name: string;
    instructor_name: string;
    course_image: string;
    course_tag: string;
    course_content: CourseContent[];
}

export interface CourseContent {
    title: string;
    pdf: string;
    video: string;
    isCompleted: boolean;
}
