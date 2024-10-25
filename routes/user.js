const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const middleware = require("../middleware/middleware");
const electionController = require("../controllers/Contest");
const groupsController = require("../controllers/groups");
const districtController = require("../controllers/district");
const constituencyController = require("../controllers/constituency");
const contestController = require("../controllers/Contest");
const selectedMLAController = require("../controllers/selectedMLA");
const referralBonusController = require("../controllers/referralBonus");
const helpAndSupportController = require("../controllers/helpAndSupport");
const appUpdateController = require("../controllers/appUpdate");
const cabinetController = require("../controllers/cabinet");
const cabinetContestController = require("../controllers/cabinetContest");
const cabinetMembersController = require("../controllers/cabinetMembers");
const cabinetContestSelectedMemberController = require("../controllers/cabinetContestSelectedMember");
const walletTransactionController = require("../controllers/walletTransaction");
const walletController = require("../controllers/wallet");
const upiGatewaysController = require("../controllers/upiGateways");
const privacyPolicyController = require("../controllers/privacyPolicy");
const termsAndConditionController = require("../controllers/termsAndCondition");
const exitPollController = require("../controllers/exitPoll");
const exitPollContestController = require("../controllers/ExitPollContest");
const exitPollPredictionController = require("../controllers/exitPollPrediction");

router.post("/login", userController.loginRegister);

router.post("/send-otp", userController.sendOtp);
router.post("/change-password", userController.changePassword);

router.get("/view-profile", middleware, userController.viewProfile);
router.put("/edit-profile", middleware, userController.editProfile);

router.get("/referral-code", middleware, userController.getReferralCode);

router.get(
  "/referral-bonus",
  middleware,
  referralBonusController.referralBonus
);

router.get("/groups", middleware, groupsController.getGroups);
router.get("/groups/:id", middleware, groupsController.getGroupById);

router.get("/district", middleware, districtController.getDistricts);
router.get("/district/:id", middleware, districtController.getDistrictById);

router.get(
  "/constituency/:id",
  middleware,
  constituencyController.getConstituenciesByDistrictId
);

router.get(
  "/contest/:group/:district/:constituency",
  middleware,
  contestController.getContestByPartyDistrictConstituency
);
router.get("/contest/:id", middleware, contestController.getContestById);

router.get(
  "/contest/mla/:contestId",
  middleware,
  contestController.getContestMLA
);

router.post(
  "/selected-mla",
  middleware,
  selectedMLAController.createSelectedMLA
);

router.get(
  "/get-contest-by-user",
  middleware,
  selectedMLAController.getContestByUser
);

router.get(
  "/get-contest-by-user/:id",
  middleware,
  selectedMLAController.getContestByUserId
);

router.post(
  "/help-and-support",
  middleware,
  helpAndSupportController.helpAndSupport
);

router.get("/cabinet", middleware, cabinetController.getCabinets);
router.get("/cabinet/:id", middleware, cabinetController.getCabinetById);

router.get(
  "/cabinet-contest-by-cabinet/:cabinetId",
  middleware,
  cabinetContestController.getCabinetContestsByCabinetId
);
router.get(
  "/cabinet-contest/:id",
  middleware,
  cabinetContestController.getCabinetContestById
);

router.get(
  "/cabinet-member/:cabinetId",
  middleware,
  cabinetMembersController.getCabinetMemberByCabinetId
);

router.post(
  "/cabinet-contest-selected-member",
  middleware,
  cabinetContestSelectedMemberController.createCabinetContestSelectedMember
);
router.get(
  "/cabinet-contest-selected-member",
  middleware,
  cabinetContestSelectedMemberController.getCabinetContestSelectedMemberByCabinetContestId
);
router.get(
  "/cabinet-contest-selected-member/:cabinetContestId",
  middleware,
  cabinetContestSelectedMemberController.getCabinetContestSelectedMember
);

router.get("/app-update", middleware, appUpdateController.getAppUpdate);

router.get("/wallet-by-user", middleware, walletController.getWallet);
router.put("/pay-though-wallet", middleware, walletController.payThoughWallet);

router.post(
  "/wallet-transaction",
  middleware,
  walletTransactionController.createWalletTransaction
);
router.put(
  "/success-wallet-transaction",
  middleware,
  walletTransactionController.successWalletTransaction
);

router.get(
  "/wallet-transaction/:id",
  middleware,
  walletTransactionController.getWalletTransactionById
);

router.get("/wallet-amount", middleware, userController.walletAmount);

router.get(
  "/upi-gateway",
  middleware,
  upiGatewaysController.getRandomUpiGateway
);

router.get(
  "/privacy-policy",
  middleware,
  privacyPolicyController.privacyPolicy
);
router.get(
  "/terms-and-condition",
  middleware,
  termsAndConditionController.termsAndCondition
);

router.get("/exit-poll", middleware, exitPollController.getExitPolls);

router.get(
  "/exit-poll-contest-by-exit-poll/:exitPollId",
  middleware,
  exitPollContestController.getExitPollContestsByExitPollId
);

router.post(
  "/exit-poll-prediction",
  middleware,
  exitPollPredictionController.addExitPollPrediction
);
router.get(
  "/exit-poll-prediction",
  middleware,
  exitPollPredictionController.getMyExitPollPrediction
);
router.get(
  "/exit-poll-prediction/:id",
  middleware,
  exitPollPredictionController.getExitPollPredictionById
);

router.get("/scrape-base64", middleware, userController.scrapeBase64);

module.exports = router;
