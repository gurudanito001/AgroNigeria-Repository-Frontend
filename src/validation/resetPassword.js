import Validator from 'validator'

export default function ValidateResetPassword ( resetLink, password1, password2 ){
    let errorMessage = ''
    password1 = !Validator.isEmpty(password1.trim()) ? password1 : "";
    password2 = !Validator.isEmpty(password2.trim()) ? password2 : "";
    resetLink = !Validator.isEmpty(resetLink.trim()) ? password2 : "";

    if(password1 === "" || password2 === ""){
        errorMessage = "Both password fields are reqired";
    }else if(password1 !== password2){
        errorMessage = "Passwords do not match" 
    }else if(resetLink === ""){
        errorMessage = "Reset token was not provided"
    }

    return {
        isValid: Validator.isEmpty(errorMessage),
        errorMessage,
        resetDetails: Validator.isEmpty(errorMessage)? { newPass: password1, resetLink } : ""
    }
}