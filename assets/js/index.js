let registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit",formSubmission);

let error = {
    firstName:{
        state:null,
        message:""
    },
    lastName:{
        state:null,
        message:""
    },
    email:{
        state:null,
        message:""
    },
    number:{
        state:null,
        message:""
    },
    batch:{
        state:null,
        message:""
    },
    module:{
        state:null,
        message:""
    },
    terms:{
        state:null,
        message:""
    }

}

function formSubmission(event){
    event.preventDefault();
    let isValid = validateOnSubmit();
    if(isValid){
        alert("Your details have been saved successfully!");
        document.getElementById("register-form").reset();
    }
}

function validationFun(event){
    let fieldName = event.target.name;
    let fieldValue = event.target.value;
    let hasKey = error.hasOwnProperty(fieldName);

    if(hasKey){
            if(!fieldValue){
                error[fieldName] = {
                    state:fieldValue? false:true,
                    message:fieldValue? "" :`Please enter a valid ${fieldName}`
                }
            }else if((fieldValue) && (fieldName == "firstName" || fieldName == "lastName")){
                error[fieldName] = {
                    state:fieldValue.length < 3? true:false,
                    message:fieldValue.length < 3? "Minimum 3 char" :""
                }
            }else if((fieldValue) && (fieldName == "email")){
                let isValid = /^([\w.+]{0,})([^\W])(@)([\w]{2,20})(\.[\w]{2,4})+$/.test(fieldValue);
                if(isValid){
                    error[fieldName] = {
                        state:isValid ? false:true,
                        message:isValid ? "":`Please enter a valid ${fieldName}`
                    }
                }else{
                    error[fieldName] = {
                        state:isValid ? false:true,
                        message:isValid ? "":`Please enter a valid ${fieldName}`
                    }
                }
            }else if((fieldValue) && (fieldName == "number")){
                let numberLength = /^\d{10}$/.test(fieldValue);
                
                if(numberLength){
                    error[fieldName] = {
                        state: numberLength? false:true,
                        message: numberLength? "":"Length exactly equal to 10 numbers"
                    }
                }else{
                    error[fieldName] = {
                        state: numberLength? false:true,
                        message: numberLength? "":"Length exactly equal to 10 numbers"
                    }
                }
            }else if((fieldValue) && (fieldName == "batch" || fieldName == "module")){
                error[fieldName] = {
                    state: fieldValue? false:true,
                    message: fieldValue? "":`Please select a valid ${fieldName}`
                }
            }
        }
    if(error[fieldName].state == true){
        document.getElementById(`${fieldName}Error`).innerHTML = error[fieldName].message;
    }else{
        document.getElementById(`${fieldName}Error`).innerHTML = "";
    }   
}

function validationCheckbox(event){
    let checkbox = event.target;
    let checkboxName = checkbox.name
    let checked = checkbox.checked;
    error[checkboxName] = {
        state:checked? false:true,
        message:checked? "" :`You must agree before submitting.`
    }
    if(error[checkboxName].state == true){
        document.getElementById(`${checkboxName}Error`).innerHTML = error[checkboxName].message;
    }else{
        document.getElementById(`${checkboxName}Error`).innerHTML = "";
    }   
}

function validateOnSubmit(){
    let valid = true;
    for(let key in error){
      if(error[key].state === null || error[key].state === true ){
        error[key].state = true;
        error[key].message = error[key].message ? error[key].message : "This field is required.";
        if(error[key].state == true){
            document.getElementById(`${key}Error`).innerHTML = error[key].message;
        }
        valid = false;
      }
    }
    return valid;
}