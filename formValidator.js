function validateForm() {
    console.log("working");
    let name = document.forms["contact-form"]["name"].value;
    if (name == "") {
      document.getElementById('name-error').style.display="block";
      return false;
    }
    let email = document.forms["contact-form"]["email"].value;
    console.log(email);
    if(email=="" || !String(email).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        document.getElementById('email-error').style.display="block";
        return false;
    }
    let message = document.forms["contact-form"]["message"].value;
    if(message.length<8){
        document.getElementById('msg-error').style.display="block";
        return false;
    }
  }