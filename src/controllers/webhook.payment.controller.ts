import { Request, Response } from "express";
import stripe from "../config/stripeApi";
import UserModel from "../models/UserModel";

export const webhookPayment = async (req: Request, res: Response) => {
    const endpointSecret = process.env.WEBHOOK_SECRET || '';
    const sig = req.headers['stripe-signature'] || '';
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);


        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const subscriptionId = session.subscription;

                const metadata = session.metadata;
                if (metadata === null || !metadata.id_user || !subscriptionId) {
                    console.error('user_id is missing or metadata is null, or subscriptionId is null.');
                    return res.status(400).send('Error: user_id is missing or metadata is null or subscriptionId is null.');
                }

                const id = metadata.id_user;

                await updatePlanStatus({ id_user: id, status: 'Premium', id_suscription: subscriptionId.toString() });
                break;

            case 'checkout.session.expired':
                const expiredSession = event.data.object;
                console.log(`Checkout session expired for session ID: ${expiredSession.id}`);
                break;

            case 'payment_intent.payment_failed':
                const failedPaymentIntent = event.data.object;
                console.log(`PaymentIntent failed for payment intent ID: ${failedPaymentIntent.id}`);
                break;

           
            case 'customer.subscription.deleted':
                console.log('Subscription deleted event received');
                const subscriptionDeleted = event.data.object;
                const userId = subscriptionDeleted.metadata.id_user;
                
                if (!userId) {
                    console.error('user_id is missing in subscription deleted event.');
                    return res.status(400).send('Error: user_id is missing in subscription deleted event.');
                }

                await updatePlanStatus({ id_user: userId, status: 'Basico', id_suscription: "" });

                console.log(`User with ID ${userId} subscription was canceled, status set to "Basico"`);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.status(200).send('Event received');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error verifying webhook:', error.message);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        } else {
            console.error('Unknown error verifying webhook:', error);
            return res.status(400).send('Webhook Error: Unknown error');
        }
    }
};

const updatePlanStatus = async (
    { id_user, status, id_suscription = "" }: 
    { id_user: string, status: 'Premium' | 'Basico', id_suscription?: string }
) => {
    try {
        let updateData: any = { tipo_suscripcion: status };
        
        if (id_suscription) {
            updateData.id_suscripcion = id_suscription;
        }

        const updateStatus = await UserModel.update(
            updateData,
            { where: { id: id_user } } 
        );

        if (updateStatus[0] === 1) {
            console.log(`User with ID ${id_user} updated to ${status} subscription.`);
        } else {
            console.log(`No user found with ID ${id_user} or status already ${status}.`);
        }
    } catch (error) {
        console.error(`Error updating user subscription for ID ${id_user}: ${error}`);
    }
};