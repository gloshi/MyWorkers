import { Employee } from "@prisma/client";
import { api } from "./api";

export const employee = api.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    getSingleEmployee : builder.query<Employee, string>({
        query: (id) => ({
          url: `/employees/${id}`,
          method: "GET",
        }),
      }),
      editEmployee : builder.mutation<string, Employee>({
        query: (employee) => ({
          url: `/employees/edit/${employee.id}`,
          method: "PUT",
          body: employee
        }),
      }),
      deleteEmployee : builder.mutation<string, string>({
        query: (id) => ({
          url: `/employees/remove/${id}`,
          method: "POST",
          body: {id}
        }),
      }),
      addEmployee : builder.mutation<Employee, Employee>({
        query: (employee) => ({
          url: `/employees/add`,
          method: "POST",
          body: employee
        }),
      }),
  }),
});

export const {
    useGetAllQuery,
    useGetSingleEmployeeQuery,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
    useAddEmployeeMutation
} = employee
export const {
    endpoints: {
        getAll,
        getSingleEmployee,
        editEmployee,
        deleteEmployee,
        addEmployee
    }

} = employee