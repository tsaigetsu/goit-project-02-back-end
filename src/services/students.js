// src/services/students.js 

import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = async () => {
  return await StudentsCollection.find();
};

export const getStudentById = async (studentId) => {
  return await StudentsCollection.findById(studentId);
};

export const createStudent = async (data) => {
  const newStudent = new StudentsCollection(data);
  return await newStudent.save();
};

export const updateStudentById = async (studentId, data) => {
  return await StudentsCollection.findByIdAndUpdate(studentId, data, { new: true });
};

export const deleteStudentById = async (studentId) => {
  return await StudentsCollection.findByIdAndDelete(studentId);
};
