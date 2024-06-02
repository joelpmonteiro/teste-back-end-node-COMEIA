import { Router } from "express";
import { route_avaliacao } from "./avaliacao/route-avaliacao";
import { route_user } from "./user/route-user";

const router = Router();

router.use(route_avaliacao);
router.use(route_user);

export default router;
