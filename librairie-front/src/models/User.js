// models/User.js

export default class User {
    constructor({ id, email, nom, prenom, roles }) {
        this.id = id;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.roles = roles || []; // Default to empty array if roles are undefined
    }

    isAdmin() {
        return this.roles.includes('ROLE_ADMIN');
    }
}
