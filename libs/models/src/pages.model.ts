import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const pagesScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        pageType: {
            type: String,
            default: 'page',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        parent: {
            type: String,
            default: 'home',
        },
        content: {
            type: String,
            required: true,
        },
        isDraft: {
            type: Boolean,
            default: false,
        },
        addToFooter1: {
            type: Boolean,
            default: false,
        },
        addToFooter2: {
            type: Boolean,
            default: false,
        },
        delete: {
            type: Boolean,
            default: false,
        },
        deleteAt: {
            type: Date,
        },
        disable: {
            type: Boolean,
            default: false,
        },
        disableAt: {
            type: Date,
        },
    },
    { timestamps: true }
)

if (mongoose.models.Pages) {
    delete mongoose.models.Pages
}

const Pages = mongoose.models.Pages || mongoose.model('Pages', pagesScheme)
export default Pages
