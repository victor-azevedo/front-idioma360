import { tokenService } from "../token-service";
import { api } from "./api-service";

async function getCourses() {
  const response = await api.get("/courses", {
    headers: {
      Authorization: `Bearer ${tokenService.get()}`,
    },
  });

  return response.data;
}

async function getCourseById(id) {
  const response = await api.get(`/courses/${id}`);

  return response.data;
}

async function getCoursesClasses(status) {
  const query = status ? `?offerStatus=${status}` : "";

  const response = await api.get(`/courses/classes${query}`);

  return response.data;
}

async function postCourse(data) {
  const response = await api.post("/courses", data);

  return response.data;
}

async function patchCourse(id, data) {
  const response = await api.patch(`/courses/${id}`, data);

  return response.data;
}

async function deleteCourse(id) {
  const response = await api.delete(`/courses/${id}`);

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
