import Validator from 'validator'

export default function ValidateAuthenticate (email, password){
    let errorMessage = ''
    email = !Validator.isEmpty(email.trim()) ? email : "";
    password = !Validator.isEmpty(password.trim()) ? password : "";

    if(Validator.isEmpty(email)){
        errorMessage = 'Please fill in User Email'
    }else if(Validator.isEmpty(password)){
        errorMessage = 'Please fill in User Password'
    }else if(!Validator.isEmail(email)){
        errorMessage = 'Email is not Valid'
    }

    return {
        isValid: Validator.isEmpty(errorMessage),
        errorMessage,
        loginDetails: Validator.isEmpty(errorMessage)? { email, password } : ""
    }
}