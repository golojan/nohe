import mongoose, { Document } from 'mongoose'

mongoose.Promise = global.Promise

const doctorsScheme = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        picture: {
            type: String,
            default: '/images/avatar/user.png',
        },
        firstname: {
            type: String,
            default: '',
        },
        lastname: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: String,
        enable_otp: String,
        otp: String,
        password: String,
        gender: {
            type: String,
        },
        birthday: { type: String, default: '' },
        department: {
            type: String,
            default: 'General',
        },
        unit: {
            type: String,
            default: 'Clinic',
        },
        role: {
            type: String,
            default: 'Doctor',
        },
        smsNotification: {
            type: Boolean,
            default: false,
        },
        emailNotification: {
            type: Boolean,
            default: false,
        },
        smsBalance: {
            type: Number,
            default: 0,
        },
        lastLogin: {
            type: Date,
        },
        delete: {
            type: Boolean,
            default: false,
        },
        deleteAt: {
            type: Date,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        disableAt: {
            type: Date,
        },
    },
    { timestamps: true }
)

if (mongoose.models.Doctors) {
    delete mongoose.models.Doctors
}

const Doctors = mongoose.models.Doctors || mongoose.model('Doctors', doctorsScheme)
export default Doctors