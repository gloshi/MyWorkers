import { Employee } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { employee } from "../../app/config/employee";
import { RootState } from "../../app/store";

interface InitialState {
    employees: Employee[] | null
}

const initialState: InitialState = {
    employees: null
}

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(employee.endpoints.getAll.matchFulfilled, (state,action) => {
                state.employees = action.payload
        })
    }
})

export default employeeSlice.reducer

export const selectEmployees = (state: RootState) =>
  state.employees.employees;