import React, { useState } from 'react';
import "../styles/Register.scss";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    })

    const handleChange = (e) => {
        const {name, value, files } = e.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        })
    }

    console.log(formData)

  return (
    <div className='register'>
        <div className="register_content">
            <form className="register_content_form">
                <input
                    placeholder='First Name'
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    placeholder='Last Name'
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    placeholder='Email'
                    name="email"
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    placeholder='Password'
                    name="password"
                    type='password'
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    placeholder='Confirm Password'
                    name="confirmPassword"
                    type='password'
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <input
                    id="image"
                    type='file'
                    name="profileImage"
                    accept='image/*'
                    style={{display: 'none'}}
                    required
                    onChange={handleChange}
                />
                <label htmlFor='image'>
                    <img src="/assets/addImage.png" alt="add profile pic" />
                    <p>Upload Your Photo</p>
                </label>

                {formData.profileImage && (
                    <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="profile pic"
                        style={{ maxWidth: "80px" }}
                    />
                )}

                <button type='submit'>Register</button>
            </form>
            <a href='/login'>Already have an account? Login In Here</a>
        </div>
    </div>
  )
}

export default RegisterPage