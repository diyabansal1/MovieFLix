const User = require('../models/User');
const bcrypt = require('bcrypt')
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //console.log(object);
        console.log(req.body);
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "User Already exits" })
        }
        else {
            const hashpass = await bcrypt.hash(password, 10);
            const createuser = new User({ username, email: email, password: hashpass })
            await createuser.save()
            res.status(201).json({
                msg: "User Created", user: {
                    _id: createuser._id,
                    name: createuser.name,
                    email: createuser.email

                }
            })
        }

    }
    catch (err) {
        console.log('Error:', err);
        res.status(500).json({ msg: "Internal Server error" });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email });
        const comparepass = await bcrypt.compare(password, user.password)
        if (!user || !comparepass) {
            return res.status(400).json({ msg: "Invalid Username or Password" })
        }
        else {
            return res.status(200).json({ msg: "User LoggedIn", user })
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ msg: "Internal Server error" });
    }

}

module.exports = { signup, login };