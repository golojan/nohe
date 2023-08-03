import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const departmentsScheme = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        departmentName: String,
        departmentDescription: {
            type: String,
            default: '',
        },
        departmentHead: {
            type: String,
            default: '',
        },
        enabled: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
)

if (mongoose.models.Departments) {
    delete mongoose.models.Departments
}

const Departments = mongoose.models.Departments || mongoose.model('Departments', departmentsScheme)
export default Departments