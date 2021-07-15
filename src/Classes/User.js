export class User {

    // Builds the user object like a constructor would.
    build(name, email, projects){
        this.name = name;
        this.email = email;
        // Array of all associated projects
        this.projects = projects;
        this.logged_in = true;

        return this.sessionSave();
    }

    // Clears the user
    clear(){
        this.name = "";
        this.email = "";
        this.projects = "";
        this.logged_in = false;
    }

    sessionRestore(){
        let store = window.localStorage.getItem("user");
        if (store){
            let save = JSON.parse(window.localStorage.getItem("user"));

            this.name = save.name;
            this.email = save.email;
            this.projects = save.projects;
            console.log(`User is restored to: ${this.name}`)
        }

        return this;
    }

    sessionSave(){
        console.log(JSON.stringify(this));
        window.localStorage.setItem("user", JSON.stringify(this))
        return true;
    }
}