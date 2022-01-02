import * as yup from 'yup';

export default yup.object().shape({
    password: yup.string().required('Password cannot be empty').min(6, 'Password must be atleast 6 characters long'),
    email: yup.string('Email is not valid').required('Email address is empty').email('Email is not valid')
});