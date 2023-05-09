import mongoose from 'mongoose'

import Accounts from './src/accounts.model'
import Settings from './src/settings.model'
import Pages from './src/pages.model'

const { MONGOOSE_URI } = process.env

export const dbCon = async () => {
    mongoose.set('strictQuery', true)
    await mongoose
        .connect(MONGOOSE_URI as string)
        .then(() => {
            console.log('Mongoose Connection Established')
        })
        .catch((err: Error) => console.log(err))
    return {
        Settings,
        Accounts,
        Pages,
    }
}
