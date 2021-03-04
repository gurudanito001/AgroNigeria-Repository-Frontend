import Validator from 'validator'
export default function ValidateAddNewUser (data){
    let {firstName, lastName, role, email, password1, password2} = data;
    let errorMessage = ''
    let newUser

    firstName = !Validator.isEmpty(firstName.trim()) ? firstName : "";
    lastName = !Validator.isEmpty(lastName.trim()) ? lastName : "";
    role = !Validator.isEmpty(role.trim()) ? role : "";
    email = !Validator.isEmpty(email.trim()) ? email : "";
    password1 = !Validator.isEmpty(password1.trim()) ? password1 : "";
    password2 = !Validator.isEmpty(password2.trim()) ? password2 : "";

    if(Validator.isEmpty(firstName)){
        errorMessage = 'Please fill in User Firstname'
    }else if(Validator.isEmpty(lastName)){
        errorMessage = 'Please fill in User Lastname'
    }else if(Validator.isEmpty(role)){
        errorMessage = 'Please fill in User Role'
    }else if(Validator.isEmpty(email)){
        errorMessage = 'Please fill in User Email'
    }else if(Validator.isEmpty(password1)){
        errorMessage = 'Please fill in User Password'
    }else if(Validator.isEmpty(password2)){
        errorMessage = 'Please fill in User Confirmed Password'
    }else if(!Validator.isEmail(email)){
        errorMessage = 'Email is not Valid'
    }else if(password1 !== password2){
        errorMessage = 'Passwords do not match'
    }else if(password1.length < 8){
        errorMessage = 'Password must be 8 characters or more'
    }
    else{
        newUser = {
            firstName, lastName, role, email, password: password1
        }
    }

    return {
        isValid: Validator.isEmpty(errorMessage),
        errorMessage,
        newUser: Validator.isEmpty(errorMessage) ? newUser : ""
    }
}