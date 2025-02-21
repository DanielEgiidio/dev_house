import AccordionSections from "@/components/AccordionSections";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import React from "react";

const SelectedCourse = ({ course, handleEnrollNow }: SelectedCourseProps) => {
  return (
    <div className="selected-course">
      <div>
        <h3 className="selected-course__title">{course.title}</h3>
        <p className="selected-course__author">
          Por {course.teacherName} |{" "}
          <span className="selected-course__enrollment-count">
            {course?.enrollments?.length}
          </span>
        </p>
      </div>

      <div className="selected-course__content">
        <p className="selected-course__description">{course.description}</p>

        <div className="selected-course__sections">
          <h4 className="selected-course__sections-title">Conteúdo do curso</h4>
          <AccordionSections sections={course.sections} />
        </div>

        <div className="selected-course__footer">
          <span className="selected-course__price">
            {formatPrice(course.price)}
          </span>
          <Button
            onClick={() => handleEnrollNow(course.courseId)}
            className=" bg-[#7916ff] text-white text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-[#6b04fd] active:bg-[#6b04fd] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full sm:w-auto"
          >
            Matricular
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCourse;
