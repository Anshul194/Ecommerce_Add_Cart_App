const User = require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const createUser=async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create
    (
    { username,
         email,
          password:hashedPassword }
        );
    return await newUser.save();
};

const signin = async (userData, req, res) => {
    try {
        const { email, password } = userData;
        console.log(userData);

        const existingData = await User.findOne({ email });
    
        if (!existingData) {
            return res.status(400).json({ message: "Email Id does not exist" });
        }
       
        if (await bcrypt.compare(password, existingData.password)) {
            const accessToken = jwt.sign(
                {
                    user: {
                        id: existingData._id,
                        email: existingData.email,
                        isUserToken: true,
                    },
                },
                process.env.Access_Token_Secret,
                { expiresIn: "30m" }
            );
            console.log(accessToken);
        
            return accessToken;
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Failed to login", error: error.message });
    }
};


    module.exports={
        createUser,signin
    }