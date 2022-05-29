const code = {
    SUCCESS:'0000',//success
    PARAM_ERROR: '1001', //Parameter error
    USER_ACCOUNT_ERROR: '1002', //Incorrect username or password
    USER_LOGIN_ERROR: '1003',//User not logged in
    TOKEN_ERROR: '1004',//Token verification failed
    ERROR:'9999',//Generic error
    DB_ERROR:'1005',//Database error
}
class baseModel {
    constructor (data,message){
        if(typeof data === 'string'){
            this.message = data
            data = null
            if(message){
                this.code = message
            }
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}
class successModel extends baseModel {
    constructor (data,message){
        super(data,message) 
        this.errorCode = code.SUCCESS
    }
}
class errorModel extends baseModel {
    constructor (data,message) {
        super(data,message)
        this.errorCode = this.code || code.ERROR
        delete this.code
    }
}

module.exports = {
    successModel,
    errorModel,
    code
}