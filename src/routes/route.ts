import { Router } from "express";
import { route_avaliacao } from "./avaliacao/route-avaliacao";
import { route_user } from "./user/route-user";
import { route_auth } from "./auth/route-auth";
const router = Router();

router.use(route_avaliacao);
router.use(route_user);
router.use(route_auth);

export default router;
