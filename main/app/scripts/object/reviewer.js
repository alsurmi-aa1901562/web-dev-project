export class Reviewer{
    #id;
    #fname;
    #lname;
    #assignedSubmissions;

    constructor(fname, lname){
        this.#fname = fname;
        this.#lname = lname;
        /*
        implement nanoid
        this.#id = randomid;
        /////////////////////////

        implement webapi
        this.#assignedSubmissions = fetch(json containing assigned submissions under reviewer id);
        */
    }

    get id(){
        return this.#id;
    }

    get fname(){
        return this.#fname;
    }

    get lname(){
        return this.#lname;
    }

    get assignedSubmissions(){
        return this.#assignedSubmissions;
    }

    set fname(firstName){
        this.#fname = firstName;
    }

    set lname(lastName){
        this.#lname = lastName;
    }

    set assignedSubmissions(submissionsList){
        this.#assignedSubmissions = submissionsList;
    }

    toString() {
        return `Reviewer #${this.id}: [First Name: ${this.fname}], [Last Name: ${this.lname}], [Assigned Revisions: ${this.assignedSubmissions}]`;
    }

    toJSON(){
        return {
            id: this.id,
            firstName: this.fname,
            lastName: this.lname,
            assignedSubmissions: this.assignedSubmissions,
        }
    }
}