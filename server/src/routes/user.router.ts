import { Router } from "express";
import { postForUser,updatePassword, UserInfoUpdate} from "../controllers/user.controller";
const router=Router()

router.get("/api/user/:userId", postForUser);
router.patch("/api/user/password", updatePassword);
router.patch('/user/:userId',UserInfoUpdate)

export default router;


