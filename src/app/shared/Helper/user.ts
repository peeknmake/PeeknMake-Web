

export class User {
    private _userName = "Guest";
    // private location : string;
    private _gender = "female";
    private _email: string ;
    private _pictureLink ="/assets/user.jpg" ;

    constructor(name:string,email:string){
        this._userName = name;
        this._email = email;
    }

    set userName(userName:string){
        this._userName= userName;
    }

    set eMail(email:string){
        this._email=email;
    }

    set gender(gender:string){
        this._gender= gender;
    }

    setPictureLink(pic:any){
        this._pictureLink=pic;
    }

    get userName():string{
        return this._userName;
    }

    get eMail():string{
        return this._email;
    }

    get gender():string{
        return this._gender;
    }

    get pictureLink():any{
        return this._pictureLink;
    }
}
