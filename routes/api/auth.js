const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../Middleware/auth')

//User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Authenticate the User
// @access Public
router.post('/' ,(req, res) => {
    const { email, password } = req.body

    //Validation
    if(!email || !password) {
        return res.status(400).json({msg:'Please Enter All Fields'})
    }

    // Check for existing user
    User.findOne({ email: email })
    .then(user => {
        if(!user) {
            return res.status(400).json({ msg: 'User Does not Exist '})
        }
        
        // Validate Password
        bcrypt.compare(password, user.password)
        .then( isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err

                    res.json({
                        token,
                        user: {
                            id: user.id, // cam also use id: user._id
                            name: user.name,
                            email: user.email
                        }
                    })

                }
            )
        })
        
    })
})

// @route  GET api/auth/user
// @desc   Get User data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password') // discard the password
    .then( user => res.json(user))
})


module.exports = router