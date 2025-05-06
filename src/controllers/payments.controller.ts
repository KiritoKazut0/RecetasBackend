import { Request, Response } from "express";
import stripe from "../config/stripeApi";


export const createSession = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.body;
        if (!id_user) {
            return res.status(400).json({
                data: null,
                msg: "Error, el id del usuario es requerido"
            });
        }
        const idSuscriptionProduct = process.env.ID_SUBSCRIPTION_PRODUCT as string;

        const price = await stripe.prices.retrieve(idSuscriptionProduct);
        const product = await stripe.products.retrieve(price.product as string);


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: idSuscriptionProduct,
                    quantity: 1
                }
            ],
            success_url: `http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:3000/payment/cancel",
            metadata: {
                id_user
            }
        });

        return res.status(200).json({
            url: session.url
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: null,
            msg: "Error, hubo un problema al intentar procesar su pago. Porfavor intente más tarde"
        });
    }
}


export const cancelSuscription = async (req: Request, res: Response) => {
    try {
   
        const { id_user, id_suscripcion } = req.body;
        if (!id_user || !id_suscripcion) {
            return res.status(400).json({
                data: null,
                msg: "Error, el id del usuario es requerido y el id de la suscripción es requerido"
            });
        }

     await stripe.subscriptions.update(id_suscripcion, {
        cancel_at_period_end: true,
      });

      return res.status(200).json({
        data: null,
        msg: "La suscripción se ha cancelado correctamente, la cancelación se aplicará al final del ciclo de facturación actual.",
      });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            data: null,
            msg: "Error, hubo un problema al intentar cancelar su suscripción. Porfavor intente más tarde"
        });

    }

}



export const handleSuccess = async (req: Request, res: Response) => {
    try {
        // Obtener el ID de sesión desde la URL
        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({
                data: null,
                msg: "ID de sesión no proporcionado"
            });
        }

        // Recuperar los detalles de la sesión de Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id as string, {
            expand: ['subscription']
        });

        if (!session.subscription) {
            return res.status(400).json({
                data: null,
                msg: "No se encontró información de suscripción"
            });
        }

        // Obtener detalles de la suscripción
        const subscriptionId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
            expand: ['default_payment_method']
        });

        // Obtener la fecha de inicio y el intervalo de facturación
        const startDate = new Date(subscription.start_date * 1000);
        const interval = subscription.items.data[0]?.price?.recurring?.interval; // Asegurarse de que price y recurring existen

        if (!interval) {
            return res.status(400).json({
                data: null,
                msg: "No se encontró el intervalo de facturación"
            });
        }

        // Calcular la próxima fecha de renovación
        let nextRenewalDate = new Date(startDate);

        if (interval === 'month') {
            // Si es mensual, sumamos un mes
            nextRenewalDate.setMonth(nextRenewalDate.getMonth() + 1);
        } else if (interval === 'year') {
            // Si es anual, sumamos un año
            nextRenewalDate.setFullYear(nextRenewalDate.getFullYear() + 1);
        }

        const formattedRenewalDate = `${('0' + nextRenewalDate.getDate()).slice(-2)}/${('0' + (nextRenewalDate.getMonth() + 1)).slice(-2)}/${nextRenewalDate.getFullYear()}`;

        // Obtener los últimos 4 dígitos del método de pago
        let last4 = '****';
        if (subscription.default_payment_method &&
            typeof subscription.default_payment_method !== 'string' &&
            subscription.default_payment_method.type === 'card' &&
            subscription.default_payment_method.card) {
            last4 = subscription.default_payment_method.card.last4;
        }

        // Obtener la fecha actual para la transacción
        const currentDate = new Date();
        const transactionDate = `${('0' + currentDate.getDate()).slice(-2)}/${('0' + (currentDate.getMonth() + 1)).slice(-2)}/${currentDate.getFullYear()}`;

        // Generar ID de transacción
        const transactionId = `TR-${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}-${Math.floor(1000 + Math.random() * 9000)}`;

        // Obtener detalles del producto/plan
        let planName = 'Premium';
        let periodName = 'Mensual';

        if (subscription.items.data.length > 0) {
            const item = subscription.items.data[0];
            if (item.price?.nickname) {
                planName = item.price.nickname;
            }

            if (item.price?.recurring) {
                periodName = item.price.recurring.interval === 'month' ? 'Mensual' : 'Anual';
            }
        }



        // Renderizar la página HTML con los datos dinámicos
        res.render('success', {
            layout: false,
            plan: planName,
            period: periodName,
            nextRenewal: formattedRenewalDate,
            transactionId: transactionId,
            transactionDate: transactionDate,
            paymentMethod: last4
        });

    } catch (error) {
        console.error('Error al procesar página de éxito:', error);
        res.status(500).send('Error al procesar la página de éxito');
    }
}



export const redirectCancel = (req: Request, res: Response) => {
    return res.redirect('/cancel.html')
}