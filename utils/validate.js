class Validate {
    constructor(data) {
        this.data = data;
    }

    isEmail(data) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return pattern.test(data);
    }
}

module.exports = Validate;