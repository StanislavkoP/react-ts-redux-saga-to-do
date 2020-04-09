import * as Yup from "yup";

export const projectValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Min length is 3')
        .max(100, 'Max length is 100')
        .required('Required field'),
    description: Yup.string()
        .min(3, 'Min length is 6')
        .max(1000, 'Max length is 1000')
        .required('Required field'),
});

export const taskValidationSchema = Yup.object().shape({
    description: Yup.string()
        .min(3, 'Min length is 6')
        .max(1000, 'Max length is 1000')
        .required('Required field'),
});
