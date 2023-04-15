import { apiAuth } from "./api-service";

async function getCourses() {
  const response = await apiAuth.get("/courses");

  return response.data;
}

async function getCourseById(id) {
  const response = await apiAuth.get(`/courses/${id}`);

  return response.data;
}

async function getCoursesClasses(status) {
  const query = status ? `?offerStatus=${status}` : "";

  const response = await apiAuth.get(`/courses/classes${query}`);

  return response.data;
}

async function postCourse(data) {
  const response = await apiAuth.post("/courses", data);

  return response.data;
}

async function patchCourse(id, data) {
  const response = await apiAuth.patch(`/courses/${id}`, data);

  return response.data;
}

async function deleteCourse(id) {
  const response = await apiAuth.delete(`/courses/${id}`);

  return response.data;
}

export const coursesApi = {
  getCourses,
  getCourseById,
  getCoursesClasses,
  postCourse,
  patchCourse,
  deleteCourse,
};
