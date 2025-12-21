import express from "express"
import { protectRoute } from "../middleware/auth.middleware";
import router from "./auth.route"
import { acceptFriendRequest } from "../Controllers/user.controller";

const router = express.Router()

// apply auth middleware to all routes
router.use(protectRoute);
router.get("/",getRecommendedUsers);

router.get("/friends",getMyfriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);
export default  router;