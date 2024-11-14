import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const noheSiteScheme = new mongoose.Schema(
    {
        appname: {
            type: String,
            required: true,
            unique: true,
            default: 'NOHE',
        },
        adminDomain: {
            type: String,
            default: 'http://localhost:3000/',
        },
        adminTitle: {
            type: String,
            default: 'NOHE Admin',
        },
        siteDomain: {
            type: String,
            default: 'http://localhost:3001/',
        },
        siteTitle: {
            type: String,
            default: 'National Orthopedic Hospital, Enugu.',
        },
        description: {
            type: String,
            default: 'National Orthopedic Hospital, Enugu.',
        },
        keywords: {
            type: String,
            default: 'National Orthopedic Hospital, Enugu.',
        },
        siteAddress: {
            type: String,
            default: 'Enugu State, Nigeria.',
        },
        sitePhone: {
            type: String,
            default: '234 803 000 0000',
        },
        siteEmail: {
            type: String,
            default: 'noheadmin@nohenugu.org.ng',
        },
        siteFacebook: {
            type: String,
            default: '#',
        },
        siteTwitter: {
            type: String,
            default: '#',
        },

        siteInstagram: {
            type: String,
            default: '#',
        },
        siteYoutube: {
            type: String,
            default: '#',
        },
        siteLinkedin: {
            type: String,
            default: '#',
        },
        sitePinterest: {
            type: String,
            default: '#',
        },
        siteCopyRight: {
            type: String,
            default: 'Copyright 2023, National Orthopedic Hospital',
        },
        smsBalance: {
            type: Number,
            default: 0,
        },
        siteMondayToFridays: {
            type: String,
            default: '8:00 AM - 5:00 PM',
        },
        siteSaturdays: {
            type: String,
            default: '8:00 AM - 1:00 PM',
        },
        siteSundays: {
            type: String,
            default: 'Closed',
        },
    },
    { timestamps: true }
)

if (mongoose.models.NoheSite) {
    delete mongoose.models.NoheSite
}

const NoheSite = mongoose.models.NoheSite || mongoose.model('NoheSite', noheSiteScheme)
export default NoheSite
