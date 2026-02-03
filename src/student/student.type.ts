export type CreateStudentInput = {
  studentCode: string;
  firstName: string;
  lastName?: string | undefined;
  className: string;
  section?: string | undefined;
  phone?: string | undefined;
};

export type UpdateStudentInput = {
  studentCode?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  className?: string | undefined;
  section?: string | undefined;
  phone?: string | undefined;
};
