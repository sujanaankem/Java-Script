const details = () => {
    
}
debugger;
    let firstName = prompt("Enter your first name");
    let secondName = prompt("Enter your second name");
    let phoneNo = prompt("Enter your phone number");
    let user = new Object();
    user.firstName = firstName;
    user.secondName = secondName;
    user.phoneNo = phoneNo;
    alert(JSON.stringify(user));
