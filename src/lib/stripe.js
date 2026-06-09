import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    'seeker_pro':'price_1TgH0dAe9HElrTKWyU3C7p88',
    'seeker_premium': 'price_1TgIeBAe9HElrTKW2sggxvbO',
    'recruiters_growth':'price_1TgIf4Ae9HElrTKWr3TBToog',
    'recruiters_enterprise': 'price_1TgIgAAe9HElrTKWPPZWpJBy'

}