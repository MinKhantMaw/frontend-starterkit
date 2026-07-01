export const loginRules = {
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Enter a valid email address', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Password is required', trigger: 'blur' },
        { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    ],
};
export const forgotPasswordRules = {
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Enter a valid email address', trigger: 'blur' },
    ],
};
export const resetPasswordRules = {
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Enter a valid email address', trigger: 'blur' },
    ],
    token: [{ required: true, message: 'Token is required', trigger: 'blur' }],
    password: [
        { required: true, message: 'Password is required', trigger: 'blur' },
        { min: 6, max: 15, message: 'Password must be 6 to 15 characters', trigger: 'blur' },
    ],
    password_confirmation: [{ required: true, message: 'Password confirmation is required', trigger: 'blur' }],
};
