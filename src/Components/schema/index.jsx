import * as Yup from 'yup'

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

export const signupSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your name."),
    email: Yup.string().email("Please enter validate email.").required("Please enter your name."),
    age: Yup.number().required("Age is required").min(18, "You must be at least 18 years old"),
    // password: Yup.string().matches(passwordRegex, "Please enter valid password").required("Please enter your password"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[@$!%*?&]/,
            "Password must contain at least one special character (@$!%*?&)"
        ),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password do not match!").required("Please enter confirm password.")
})