import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { InterviewType, ModalFormType } from "../types";

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  salaryDiscuss: Yup.string().required("This field is required"),
  salaryRange: Yup.string().required("Salary range is required"),
  description: Yup.string().required("Description is required"),
  nextInterviewDate: Yup.date().required("Next interview date is required"),
  rounds: Yup.array().of(
    Yup.object({
      experience: Yup.string().required("Experience is required"),
      dateOfInterview: Yup.date().required("Date of interview is required"),
    })
  ),
});

const ModalForm = ({ onClose, onSubmit, initialData }: ModalFormType) => {
  return (
    <Formik
      initialValues={
        {
          companyName: initialData?.companyName || "",
          salaryDiscuss: initialData?.salaryDiscuss || "",
          salaryRange: initialData?.salaryRange || "",
          description: initialData?.description || "",
          nextInterviewDate: initialData?.nextInterviewDate || "",
          rounds: initialData?.rounds || [
            { experience: "", dateOfInterview: "" },
          ],
        } as InterviewType
      }
      validationSchema={validationSchema}
      onSubmit={(values: InterviewType) => {
        onSubmit(values);
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="space-y-6">
          {/* Two-Column Layout for Company Name and Salary Discuss */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <Field
                name="companyName"
                placeholder="Enter company name"
                className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {touched.companyName && errors.companyName && (
                <div className="text-sm text-red-500 mt-1">
                  {errors.companyName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Discuss
              </label>
              <Field
                name="salaryDiscuss"
                placeholder="Enter salary discuss details"
                className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {touched.salaryDiscuss && errors.salaryDiscuss && (
                <div className="text-sm text-red-500 mt-1">
                  {errors.salaryDiscuss}
                </div>
              )}
            </div>
          </div>

          {/* Two-Column Layout for Salary Range and Next Interview Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range
              </label>
              <Field
                name="salaryRange"
                placeholder="Enter salary range"
                className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {touched.salaryRange && errors.salaryRange && (
                <div className="text-sm text-red-500 mt-1">
                  {errors.salaryRange}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Interview Date
              </label>
              <Field
                type="date"
                name="nextInterviewDate"
                className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {touched.nextInterviewDate && errors.nextInterviewDate && (
                <div className="text-sm text-red-500 mt-1">
                  {errors.nextInterviewDate}
                </div>
              )}
            </div>
          </div>

          {/* Full Width Field for Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              placeholder="Enter description"
              className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            />
            {touched.description && errors.description && (
              <div className="text-sm text-red-500 mt-1">
                {errors.description}
              </div>
            )}
          </div>

          {/* Scrollable Section for Rounds of Interview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rounds of Interview
            </label>
            <FieldArray
              name="rounds"
              render={(arrayHelpers) => (
                <div className="space-y-4">
                  {values.rounds.length > 0 && (
                    <div className="max-h-60 overflow-y-auto space-y-4 border p-4 rounded-lg bg-gray-50">
                      {values.rounds.map((_, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2/3">
                            <Field
                              as="textarea"
                              name={`rounds[${index}].experience`}
                              placeholder={`Round ${index + 1} Experience`}
                              className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              rows={3}
                            />
                            {touched.rounds && errors.rounds && (
                              <div className="text-sm text-red-500 mt-1">
                                {
                                  (errors.rounds as { experience: string }[])[
                                    index
                                  ]?.experience
                                }
                              </div>
                            )}
                          </div>
                          <div className="w-1/3 flex flex-col gap-2">
                            <div>
                              <Field
                                type="date"
                                name={`rounds[${index}].dateOfInterview`}
                                placeholder={`Date of ${
                                  index + 1
                                }st Experience`}
                                className="block w-full rounded-lg border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                              {touched.rounds && errors.rounds && (
                                <div className="text-sm text-red-500 mt-1">
                                  {
                                    (errors.rounds as { experience: string }[])[
                                      index
                                    ]?.experience
                                  }
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="px-4 py-2 border rounded-lg text-red-500 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ experience: "" })}
                    className="px-4 py-2 border rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  >
                    + Add Round
                  </button>
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              onClick={() => onClose(false)}
              className="px-6 py-2 border rounded-lg  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-2 border rounded-lg text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { ModalForm };
