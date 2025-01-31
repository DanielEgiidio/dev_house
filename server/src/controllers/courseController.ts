import { Request, Response } from "express";
import Course from "../models/courseModel";

export const listCourses = async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    const courses = await (category && category !== "all"
      ? Course.scan("category").eq(category).exec()
      : await Course.scan().exec());

    console.log("Retrieved courses:", JSON.stringify(courses, null, 2));

    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course = await Course.get(courseId);

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json({ message: "Course retrieved successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving course", error });
  }
};
