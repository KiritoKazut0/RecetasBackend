import { webhookPayment } from './../controllers/webhook.payment.controller';
import  {Router} from "express";
import {createSession, redirectCancel, handleSuccess, cancelSuscription} from "../controllers/payments.controller";

 const router = Router();

router.post('/checkout-sesion', createSession);
router.post('/webhook',  webhookPayment);
router.post('/suscription/cancel', cancelSuscription);
router.get('/success', handleSuccess);
router.get('/cancel', redirectCancel );


export default router;