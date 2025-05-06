import Stripe from "stripe";


const secrete_key : string = process.env['SECRET_KEY_STRIPE'] || 'defaulKey'
const stripe = new Stripe(secrete_key);

export default stripe;