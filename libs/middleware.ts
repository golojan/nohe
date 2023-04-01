import { Request, Response, NextFunction } from 'express'

const jwtSecret: string = process.env.JWT_SECRET || 'NOHENUGU'
import { convertMongoDateToFullDate, numberToNaira } from './utils'

import { PrismaClient } from '@prisma/client'
import { DECODED_TOKEN } from '../libs/interfaces'
const prisma = new PrismaClient()

const middleware = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.convertMongoDateToFullDate = convertMongoDateToFullDate

    const settings = await prisma.settings.findUnique({
        where: {
            appname: 'NOHE',
        },
    })
    if (settings && settings !== null) {
        res.locals.settings = {
            appname: settings.appname,
            domain: settings.domain,
            title: settings.title,
            description: settings.description,
            keywords: settings.keywords,
            smsBalance: numberToNaira(settings.smsBalance),
        }
    } else {
        res.locals.settings = {
            appname: 'National Orthopedic Hospital, Enugu.',
            domain: 'http://localhost:3000',
            title: 'National Orthopedic Hospital, Enugu.',
            description: 'National Orthopedic Hospital, Enugu.',
            keywords: 'National Orthopedic Hospital, Enugu.',
            smsBalance: 0,
        }
    }
    next()
}

export default middleware
