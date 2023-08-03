import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const contactsScheme = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
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

if (mongoose.models.Contacts) {
    delete mongoose.models.Contacts
}

const Contacts = mongoose.models.Contacts || mongoose.model('Contacts', contactsScheme)
export default Contacts