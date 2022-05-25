export const passValidator = (password) => {
    if (password.length == 0) {
        return "Password is required feild"
    } else if (password.length < 8 || password.length > 20) {
        return "Password should be min 8 char and max 20 char"
    } else if (password !== confirmPassword) {
        return "Passwoad and confirm password should be same."
    }
  }
export const confirmValidator = (password) => {
    if (password.length == 0) {
        return "Password is required feild"
    } else if (password.length < 8 || password.length > 20) {
        return "Password should be min 8 char and max 20 char"
    } else if (password !== confirmPassword) {
        return "Passwoad and confirm password should be same."
    }
    if (confirmPassword.length == 0) {
        return "Confirm Password is required feild"
    } else if (confirmPassword.length < 8 || confirmPassword.length > 20) {
        return "Password should be min 8 char and max 20 char"
    }
}