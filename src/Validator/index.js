const validateEmail = (email) => {
    if(email==='')
        return true;
    // eslint-disable-next-line no-useless-escape
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return true;
    else 
        return false;
}
export {
    validateEmail
}