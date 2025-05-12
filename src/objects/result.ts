export class Result<T> {


    public success: boolean = true;

    public message: string = "";

    public code: string = "";

    public data: T;

    constructor(success: boolean, data: T, code: string = "", message: string = "") {
        this.data = data;
        this.code = code;
        this.message = message;
        this.success = success;
    }
}

export class SuccessResult extends Result<any> {
    constructor(data: any = { status: true }, message = "") {
        super(true, data,null,message);
    }
}

export class ErrorResult extends Result<any> {
    constructor(code: string) {
        super(false, {}, code, code);
    }
}
